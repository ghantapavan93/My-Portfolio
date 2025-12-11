This file contains the expected final layout structure as a reference.

CURRENT LAYOUT (what we have):
```
<container>
  <grid 2 columns>
    <LEFT col (order-1)>
      - overline
      - H1  
      - paragraph
      - expandable
      - CHIPS (3 col grid) ← PROBLEM: inside left column
      - tech ticker
      - stats
      - buttons
      - social
    </LEFT>
    <RIGHT col (order-2)>
      - photo + emojis
    </RIGHT>
  </grid>
</container>
```

DESIRED LAYOUT (what user wants):
```
<container>
  <grid 2 columns>
    <LEFT col (order-1)>
      - overline
      - H1
      - paragraph
      - expandable
    </LEFT>
    <RIGHT col (order-2)>
      - photo + emojis
    </RIGHT>
  </grid>
  
  <CAPABILITIES BOX (below grid, centered max-w-5xl)>
    - Building across chips
    - What I build chips
    - How I work chips
    - Tech stack chips (no duplicates)
  </CAPABILITIES>
  
  <STATS (centered max-w-4xl, 3 col grid)>
  </STATS>
  
  <BUTTONS (centered)>
  </BUTTONS>
  
  <SOCIAL (centered)>
  </SOCIAL>
</container>
```

KEY CHANGES NEEDED:
1. Move lines 258-385 (chips/ticker/stats/buttons/social) OUT of LEFT column
2. Close LEFT div after expandable (line 257)
3. Keep RIGHT div as is
4. Close grid after RIGHT
5. Add capabilities box section with all chips
6. Add stats below
7. Add buttons below
8. Add social below
