"use strict";
// Configure your attack here - modify these values as needed
const ATTACK_CONFIG = {
    name: "Longsword Attack",
    attackBonus: 5, // Your BAB + STR modifier + weapon bonus
    damageBase: "1d8", // Your weapon damage die
    damageBonus: 3 // STR modifier + other damage bonuses
};
// Target AC to hit (modify as needed)
const TARGET_AC = 15;
// Dice rolling function
function rollDice(diceNotation) {
    const match = diceNotation.match(/(\d+)d(\d+)/);
    if (!match) {
        throw new Error("Invalid dice notation");
    }
    const numDice = parseInt(match[1]);
    const dieSize = parseInt(match[2]);
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
        rolls.push(Math.floor(Math.random() * dieSize) + 1);
    }
    const total = rolls.reduce((sum, roll) => sum + roll, 0);
    return { total, rolls };
}
// Roll a single d20
function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}
// Calculate total bonuses from checkboxes
function getActiveBonuses() {
    const flankingCheckbox = document.getElementById('flanking');
    const blessCheckbox = document.getElementById('bless');
    let attackBonus = 0;
    let damageBonus = 0;
    const descriptions = [];
    if (flankingCheckbox.checked) {
        attackBonus += 2;
        descriptions.push("Flanking +2");
    }
    if (blessCheckbox.checked) {
        attackBonus += 1;
        descriptions.push("Bless +1");
    }
    return { attack: attackBonus, damage: damageBonus, description: descriptions };
}
// Perform the attack
function performAttack() {
    const bonuses = getActiveBonuses();
    const attackRoll = rollD20();
    const totalAttackBonus = ATTACK_CONFIG.attackBonus + bonuses.attack;
    const totalAttackRoll = attackRoll + totalAttackBonus;
    const hit = totalAttackRoll >= TARGET_AC;
    const critical = attackRoll === 20;
    const criticalMiss = attackRoll === 1;
    let resultHTML = '';
    // Attack roll result
    const attackClass = hit ? 'hit' : 'miss';
    const attackStatus = critical ? 'CRITICAL HIT!' : (criticalMiss ? 'CRITICAL MISS!' : (hit ? 'HIT!' : 'MISS'));
    resultHTML += `
        <div class="result-item ${attackClass}">
            <h3>${ATTACK_CONFIG.name} - ${attackStatus}</h3>
            <p>
                <strong>Roll:</strong> d20 = ${attackRoll}<br>
                <strong>Attack Bonus:</strong> ${totalAttackBonus} (Base: ${ATTACK_CONFIG.attackBonus}${bonuses.description.length > 0 ? ', ' + bonuses.description.join(', ') : ''})<br>
                <strong>Total Attack Roll:</strong> <span class="result-value">${totalAttackRoll}</span> vs AC ${TARGET_AC}
            </p>
        </div>
    `;
    // Damage roll (if hit)
    if (hit && !criticalMiss) {
        const damageRoll = rollDice(ATTACK_CONFIG.damageBase);
        const totalDamageBonus = ATTACK_CONFIG.damageBonus + bonuses.damage;
        let totalDamage = damageRoll.total + totalDamageBonus;
        // Double damage on critical hit (simplified - some weapons have different crit multipliers)
        if (critical) {
            const critDamageRoll = rollDice(ATTACK_CONFIG.damageBase);
            totalDamage = (damageRoll.total + critDamageRoll.total) + totalDamageBonus;
            resultHTML += `
                <div class="result-item hit">
                    <h3>Damage (Critical x2)</h3>
                    <p>
                        <strong>Damage Rolls:</strong> ${ATTACK_CONFIG.damageBase} = [${damageRoll.rolls.join(', ')}] + [${critDamageRoll.rolls.join(', ')}]<br>
                        <strong>Damage Bonus:</strong> ${totalDamageBonus}<br>
                        <strong>Total Damage:</strong> <span class="result-value">${totalDamage}</span>
                    </p>
                </div>
            `;
        }
        else {
            resultHTML += `
                <div class="result-item hit">
                    <h3>Damage</h3>
                    <p>
                        <strong>Damage Roll:</strong> ${ATTACK_CONFIG.damageBase} = [${damageRoll.rolls.join(', ')}]<br>
                        <strong>Damage Bonus:</strong> ${totalDamageBonus}<br>
                        <strong>Total Damage:</strong> <span class="result-value">${totalDamage}</span>
                    </p>
                </div>
            `;
        }
    }
    // Display results
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.innerHTML = resultHTML;
    }
}
// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const attackBtn = document.getElementById('attackBtn');
    if (attackBtn) {
        attackBtn.addEventListener('click', performAttack);
    }
});
