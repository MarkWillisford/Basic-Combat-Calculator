# Pathfinder Combat Calculator

A simple web-based combat calculator for Pathfinder TTRPG sessions.

## Features

- Hard-coded attack sequence with customizable stats
- Automatic d20 attack roll and damage calculation
- Two bonus options:
  - Flanking (+2 to attack)
  - Bless (+1 to attack)
- Critical hit and miss detection
- Clean, responsive UI

## Configuration

Edit the `ATTACK_CONFIG` object in `app.ts` to customize your attack:

```typescript
const ATTACK_CONFIG: AttackSequence = {
    name: "Longsword Attack",
    attackBonus: 5,       // Your BAB + STR modifier + weapon bonus
    damageBase: "1d8",    // Your weapon damage die
    damageBonus: 3        // STR modifier + other damage bonuses
};
```

Also modify `TARGET_AC` to match your target's armor class.

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch for changes
npm run watch
```

## Deployment

This app is configured for GitHub Pages. Simply push to the repository and enable GitHub Pages in the repository settings.

## Usage

1. Select applicable bonuses (Flanking and/or Bless)
2. Click the ATTACK button
3. View the attack roll and damage results

## License

MIT
