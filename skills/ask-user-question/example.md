# A finished call

One complete AskUserQuestion call, as the shape to imitate. Read it when you want
the finished artifact rather than the rules that produce it; SKILL.md carries the
rules and the pre-flight loop that checks them.

```json
{
  "questions": [
    {
      "question": "The migration drops the legacy search index. Rebuild it now, or ship without it?",
      "header": "Index",
      "options": [
        {
          "label": "Rebuild now (Recommended)",
          "description": "Runs the rebuild inside this migration. Your index is 40 MB, so this adds about two minutes of downtime, and the deploy window you booked is thirty."
        },
        {
          "label": "Ship without it",
          "description": "Deploys immediately with no downtime. Search returns no results until someone rebuilds by hand, and nothing in the deploy reminds them."
        }
      ]
    }
  ]
}
```

Read the second description again. It states the benefit, then the failure mode, in
the same order as the first and in the same units. A reader who picks it and then
finds search empty can tell from that text that they chose it — which is the whole
job of the cost half, and the half that gets dropped.

The question carries the fact that makes the decision necessary, so nothing the
reader needs sits in the message above the dialog. The recommendation is first, its
label ends with the marker, and its justification is a number from this situation
rather than a virtue any option could claim.
