# Statistical Floor — What Every Researcher Must Know

The minimum statistical literacy to avoid embarrassing yourself with research findings. Not exhaustive — just the "don't lie with stats" floor.

## Sample size

A claim from N=5 people is anecdotal.
A claim from N=50 is suggestive.
A claim from N=500 is solid for most game research.

Power calculator (rough):
- Detecting a 10% effect with 80% power: need ~400 participants per group
- Detecting a 30% effect: need ~50 per group

For game playtests: 5-8 per segment is enough for QUALITATIVE research (themes, ideas). Not enough for QUANTITATIVE claims.

## Effect size, not p-value

p < 0.05 doesn't mean "true." It means "if there were really no effect, we'd see this pattern by chance only 5% of the time."

What you actually care about:

- **Effect size** (Cohen's d, or simpler: relative difference)
- **Confidence interval** (range the true value likely lies in)
- **Practical significance** (is the effect big enough to matter?)

A "statistically significant" 0.5% improvement in conversion = noise, often. A 30% improvement on N=20 might be real even without significance test.

## Multiple comparisons

Test 20 metrics against the control group at p < 0.05. Expect ~1 false positive even if NOTHING changed.

This is the "p-hacking" problem. Defenses:
- Pre-register what you'll test
- Bonferroni correction (divide α by N comparisons)
- Don't test things you're not going to act on

## Survivorship bias

Your sample is the SURVIVORS:

- Players who completed the level → biased toward those who could
- Steam reviewers → biased toward those who finished and chose to review
- Discord members → biased toward fans
- Email respondents → biased toward engaged

Always ask: "who's NOT in this sample, and why?"

## Selection bias

Recruitment matters:

- "Sign up for our playtest" → biased toward enthusiasts
- Friends-of-friends → biased toward your social network's demographics
- Reddit r/yourgenre → biased toward that subreddit's culture

For each sample, document recruitment method and likely biases.

## Confounding

Two variables move together; one CAUSES the other? Or both caused by a third?

Example:
- Players with longer sessions have higher retention.
- Did long sessions cause retention, or do retained players naturally play longer?

Without random assignment, you have correlation. Acknowledge it.

## A/B testing rules

- Random assignment (proper randomization, not "Tuesday vs Wednesday")
- Pre-defined success metric (don't change the goalpost)
- Pre-calculated sample size needed
- Run for sufficient time (Tuesday users ≠ Sunday users)
- Don't peek at results mid-experiment ("optional stopping" inflates false positives)

## Practical heuristics for game research

| Question | Minimum sample | Method |
|---|---|---|
| Is this fun? | 5-8 playtests | Qualitative |
| Is the tutorial clear? | 5-10 new players | Behavioral observation |
| Is feature A or B better? | 1000+ per group | A/B test with random assignment |
| Are players completing the game? | All players | Funnel analytics |
| What's the retention curve? | All players | Cohort analysis |

## Reporting honestly

When citing a finding, include:

- N (sample size)
- Sample (who they were, how recruited)
- Method (how you measured)
- Confidence (qualitative judgment: strong/medium/weak)
- What you DIDN'T find (negative results matter)

Without these, you have a vibe, not a finding.

## Cross-reference

`interview-protocols.md` for qualitative methodology. `survivorship-bias.md` for one specific bias.
