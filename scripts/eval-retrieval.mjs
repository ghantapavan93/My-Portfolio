// Regression eval for GPK's retrieval mode (lib/retrieval.js).
//
//   npm run eval:chat
//
// Each case is a question phrased the way a visitor might type it — NOT the
// canonical wording in the bank — and the answer-bank id it must route to.
// `null` means the assistant must refuse (off-topic or not in his record).
// Exits non-zero if accuracy drops below the gate, so it can run in CI.

import { answerQuestion, MIN_SCORE } from '../lib/retrieval.js';
import { ANSWER_BANK } from '../lib/answer-bank.js';

const GATE = 0.9;

const CASES = [
  // who I am
  ['tell me a bit about you', 'intro'],
  ['can you give a quick summary of your background', 'intro'],
  ['what makes you a strong candidate', 'why-hire'],
  ['why would we pick you', 'why-hire'],
  ['how many years have you been working', 'years'],
  ['what got you into building AI products', 'motivation'],

  // experience
  ['where are you working currently', 'current'],
  ['what is the QUANTUM health coach', 'current'],
  ['what was your role at vosyn', 'vosyn'],
  ['did you work on GPU inference', 'vosyn'],
  ['what happened at krowd guide', 'krowd'],
  ['tell me about afrotech', 'krowd'],
  ['what is scrappy', 'unt'],
  ['what did you do at the university of north texas', 'unt'],
  ['you had lots of companies before 2023, why', 'srm'],
  ['what was your role at SRM institute', 'srm'],
  ['did you build robots', 'robocon'],
  ['yolo on raspberry pi experience?', 'robocon'],
  ['have you done time series anomaly detection', 'lineysha'],
  ['what did you do for builder.ai', 'builder'],
  ['how large were the teams you worked in', 'team-size'],

  // projects
  ['which project are you proudest of', 'strongest-project'],
  ['explain eagleeye', 'eagleeye'],
  ['what did you build in move relay', 'move-relay'],
  ['how do you prevent duplicate orders when a reply is lost', 'move-relay'],
  ['walk me through your best backend work', 'move-relay'],
  ['how do you reduce false alarms', 'false-positives'],
  ['what is oats', 'project-h'],
  ['tell me about your health and fitness app', 'project-h'],
  ['what is nexuswatch', 'nexuswatch'],
  ['what is shelftrace', 'systems-prototypes'],
  ['what else have you built', 'other-projects'],
  ['any accessibility work', 'accessibility'],
  ['did you win a hackathon', 'hackathons'],
  ['have you published papers', 'research'],

  // stories
  ['what is the toughest technical challenge you faced', 'hardest-problem'],
  ['tell me about a time production broke', 'incident'],
  ['have you mentored people', 'leadership'],
  ['how do you handle conflict with teammates', 'collaboration'],

  // skills
  ['do you know langgraph', 'ai-fit'],
  ['have you built retrieval augmented generation', 'ai-fit'],
  ['what is your stack', 'tech-background'],
  ['do you code in java', 'languages'],
  ['k8s in prod?', 'cloud-devops'],
  ['aws experience', 'cloud-devops'],
  ['can you build react apps', 'frontend'],
  ['do you do mobile development', 'frontend'],
  ['experience with kafka and airflow', 'backend-data'],
  ['have you trained deep learning models', 'ml-depth'],
  ['how do you evaluate llm quality', 'evals'],
  ['how do you stop hallucinations', 'evals'],
  ['whats your engineering philosophy', 'approach'],
  ['are you a generalist', 'broad-fit'],
  ['any open source contributions', 'open-source'],

  // growth & logistics
  ['what are you doing these days', 'current'],
  ['how do you deal with ambiguity', 'approach'],
  ['is your work used by real users', 'impact'],
  ['what is the most complex system you built', 'hardest-problem'],
  ['what is your weakness', 'weakness'],
  ['tell me about a failure', 'differently'],
  ['do you require sponsorship', 'visa'],
  ['are you on stem opt', 'visa'],
  ['what salary do you expect', 'salary'],
  ['are you willing to relocate', 'location'],
  ['can you work remote', 'location'],
  ['how soon can you join', 'availability'],
  ['what kind of roles do you want', 'roles'],
  ['why do you want to leave your current job', 'why-looking'],
  ['what degree do you have', 'education'],
  ['what are your biggest numbers', 'impact'],
  ['how can I get in touch', 'contact'],
  ['can I get your resume', 'contact'],
  ['are you chatgpt', 'assistant'],
  ['hello', 'greeting'],
  ['thanks!', 'thanks'],

  // must decline politely or refuse
  ['what is the weather in dallas today', null],
  ['write me a poem about cats', 'tasks'],
  ['can you help me with my homework', 'tasks'],
  ['what is your favorite movie', 'personal'],
  ['how old are you', 'personal'],
  ['who won the world cup', null],
  ['do you have experience with cobol mainframes', null],
  ['did you work at google', null],
  ['what is your gpa', null],
  ['do you speak spanish', null],
  ['what is the capital of france', null],
  ['what is the weather today?', null],
  ['do you like pizza', null],
];

let pass = 0;
const failures = [];
const scores = { hit: [], refuse: [] };

for (const [question, expected] of CASES) {
  const r = answerQuestion(question);
  const got = r.grounded ? r.entryId : null;
  if (got === expected) pass++;
  else failures.push({ question, expected, got, score: Number.isFinite(r.score) ? r.score.toFixed(2) : 'exact' });
  if (Number.isFinite(r.score)) (expected ? scores.hit : scores.refuse).push(r.score);
}

// Multi-turn: "tell me more" must go deeper on the previous answer, never jump topics.
const byId = Object.fromEntries(ANSWER_BANK.map((e) => [e.id, e]));
const FOLLOW_UPS = [
  ['eagleeye', 'tell me more', byId.eagleeye.more],
  ['move-relay', 'go deeper', byId['move-relay'].more],
  ['current', 'go deeper', byId.current.more],
  ['krowd', 'elaborate', byId.krowd.more],
];
for (const [id, followUp, expected] of FOLLOW_UPS) {
  const history = [{ role: 'user', content: byId[id].q[0] }, { role: 'assistant', content: byId[id].a }];
  const r = answerQuestion(followUp, history);
  if (r.answer === expected) pass++;
  else failures.push({ question: `${id} → "${followUp}"`, expected: 'deeper answer', got: r.entryId, score: '-' });
}
const noContext = answerQuestion('tell me more');
if (!noContext.grounded && noContext.entryId === null) pass++;
else failures.push({ question: '"tell me more" with no history', expected: 'clarifying prompt', got: noContext.entryId, score: '-' });

const total = CASES.length + FOLLOW_UPS.length + 1;
const accuracy = pass / total;
const fmt = (xs) => (xs.length ? `${Math.min(...xs).toFixed(2)}–${Math.max(...xs).toFixed(2)}` : 'n/a');
console.log(`GPK retrieval eval: ${pass}/${total} (${(accuracy * 100).toFixed(1)}%) · threshold ${MIN_SCORE}`);
console.log(`  score range — should answer: ${fmt(scores.hit)} · should refuse: ${fmt(scores.refuse)}`);
if (failures.length) console.table(failures);

if (accuracy < GATE) {
  console.error(`✗ below the ${GATE * 100}% gate`);
  process.exit(1);
}
console.log('✓ passes the gate');
