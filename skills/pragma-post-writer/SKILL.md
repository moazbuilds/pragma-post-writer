---
name: pragma-post-writer
description: "LinkedIn post writer with route selection. Ask quick (Flash 💥) or expert (Ink 🖋️), then load only that workflow."
---

# Pragma Post Writer Router

## START HERE

Your first question MUST be:

"What do you want: **quick (Flash 💥)** or **expert (Ink 🖋️)**?"

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
