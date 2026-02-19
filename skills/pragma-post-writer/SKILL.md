---
name: pragma-post-writer
description: "LinkedIn post writer with route selection. Ask quick (Flash 💥) or expert (Ink 🖋️), then load only that workflow."
---

# Pragma Post Writer Router

## START HERE

Your first question MUST be:

"What do you want: **quick (Flash 💥)** or **expert (Ink 🖋️)**?"

Then explain the options clearly:

- **Quick (Flash 💥):** One-step writing pass for when the user already has a draft and wants a fast final version.
- **Expert (Ink 🖋️):** Full 5-step structured workflow:
  1. **Pre-Writing** - Find and validate the core idea
  2. **Hook** - Craft the opening lines
  3. **Body** - Build the main content
  4. **Ending** - Land the kicker and CTA
  5. **Edit & Polish** - Humanize and finalize

Wait for the answer before loading any workflow content.

## ROUTING RULES

- If user chooses **quick** or **flash**:
  - Read only: `./routes/quick.md`
  - Execute that workflow
  - Do not load expert files

- If user chooses **expert** or **ink**:
  - Read: `./routes/expert.md`
  - Then follow step loading using the expert step paths in that file
  - Do not load quick files

- If unclear:
  - Ask again with the same two options
