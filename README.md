## @sdarbonne/react-guitar-chord

### What this library does:

takes in a chord name ("C", "Ddim", "G#maj7b9") and displays a guitar chord diagram for it.

### What this library does not do:

- have any regard for playability
- think about bar chords
- display alternate positions
- display fingering

usage:

```
import GuitarChord from '@sdarbonne/react-guitar-chord'

...
return (
    <GuitarChord chord="Dm7b9" />
    <GuitarChord chord="D" />
    <GuitarChord chord="E" />
    <GuitarChord chord="F" />
    <GuitarChord chord="Dmin" />
    <GuitarChord chord="D7" />
)
```

<img width="130" alt="image" src="https://github.com/user-attachments/assets/16d6e489-62bf-4c2a-b9cc-335f5c4d28a6">

