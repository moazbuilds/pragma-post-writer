---
name: 'Step 2 - Hook'
description: 'Choose a hook type, craft the opening lines, and open a curiosity gap'
---

# Step 2: 🪝 Hook Writing

## STEP GOAL

Help the user craft **opening lines that stop the scroll**. The hook does ONE job: make the reader want the second line. By the end of this step, the user has 2-3 lines that open a curiosity gap.

## INTERACTION MODE: Interactive

Ask ONE question at a time. Follow depth-aware progression.

## STEP-SPECIFIC RULES

- Do NOT write the body or ending
- Do NOT finalize the post structure
- Your ONLY job is the first 2-3 lines
- Always explain WHY a hook works (or doesn't) in one line

---

## Sequence of Instructions

### 1. Present the 6 Hook Types

Explain the options with brief examples relevant to their specific topic:

| Hook Type | How It Works |
|-----------|-------------|
| **Reader in the story** | Drop them into a scene. Use "you" |
| **Relatable problem** | Name a frustration they've lived |
| **Set a stage** | Quick vivid scene, then pivot to why it matters |
| **Ask a question** | One sharp question they can't ignore |
| **Crazy stat** | Lead with a number that makes them double-take |
| **Personal anecdote** | Start with a moment from your life, end on cliffhanger |

Based on their chosen format (from Step 1) and their proof point, **recommend 1-2 hook types** that fit best. Explain why in one sentence each.

Ask: **"Which hook type feels right for your post?"**

### 2. Draft Hook Options

Once they pick a type, write **2-3 hook variations** (each 2-3 lines max).

For each variation, briefly note:
- What **curiosity gap** it opens
- Why the reader would need the next line

Ask: **"Which one grabs you? Or want me to try a different angle?"**

### 3. Refine the Chosen Hook

Once they pick a hook (or ask for modifications), refine it:

- **Cut the running start:** Does the real opening start at line 1, or is there warm-up to cut?
- **Front-load:** Are the most important words at the beginning of the first sentence?
- **Unexpected element:** Does it violate what the reader assumes?

Present the polished version and ask for confirmation.

### 4. The Gap Check

Final validation: "If you showed just these 2-3 lines to someone, would they say '...and then what?' or would they shrug?"

If shrug: iterate. If lean-in: done.

---

## Step Completion Checklist

ALL must be true:

- [ ] Hook type chosen (one of the 6 types)
- [ ] Hook opens a curiosity gap
- [ ] No running start (real content starts at line 1)
- [ ] First sentence front-loaded (important words first)
- [ ] User confirmed the hook

### Trigger Logic

```
AFTER EVERY USER RESPONSE:
  1. IF all 5 items satisfied → COMPLETE THE STEP NOW
  2. IF exchange count >= 9 → SOFT CHECKPOINT
  3. IF exchange count >= 12 → HARD EXIT
  4. OTHERWISE → continue refining
```

---

## Step Completion

"**Your hook is locked:**

[Display the final hook - 2-3 lines]

**Hook type:** [type used]
**Curiosity gap:** [what gap it opens]

✒(●ᴗ●)✓☆ *Got it, the structure is forming*

┌─────────────────────────────────────────────────────────┐
│  ✓ READY TO CONTINUE                                    │
│                                                         │
│  → Press ENTER to proceed to 📝 Body Writing            │
│  → Or share anything else you'd like me to know         │
└─────────────────────────────────────────────────────────┘"
