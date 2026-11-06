// Snapshot from the user-selected production conversation, read through Supabase MCP in a READ ONLY transaction.
// Source: production conversation ea2c79ac-4127-42a5-b5c7-a7b35e40f2f0
// Recording: original voice-provider audio for the call referenced by the app record.
import type { ExampleCase } from "./types";

const example: ExampleCase = {
  "slug": "disclosing-an-incidental-finding-of-metastatic-disease-with-no-known-primary",
  "title": "Disclosing an Incidental Finding of Metastatic Disease With No Known Primary",
  "metaTitle": "Disclosing metastatic cancer: example conversation",
  "role": "You are Dennis Boyd's primary care physician and have been for six years. He came to you three months ago with low back pain. You imaged it because of features that concerned you. The MRI report is in front of you and he is in the waiting room, expecting to hear about physiotherapy.",
  "summary": "A man expects an appointment about back pain and learns that his scan suggests cancer in his spine. They discuss what happens next and how to involve his wife.",
  "scenario": "Dennis Boyd, 58, has had low back pain for three months. He put it down to lifting at work. You imaged it because of what he told you at the last visit: the pain now wakes him at night, it has not improved with conservative management, and he has lost weight he was not trying to lose.\n\n**The MRI shows** diffuse low marrow signal with heterogeneously enhancing lesions at multiple levels through the lower thoracic and lumbar spine, together with a compression fracture. There is no evidence of cord compression. The appearances are reported as consistent with metastatic disease. **No primary site is identified.**\n\nSo you know two things and not a third. This is cancer, and it has spread to bone. Where it came from is not yet known, and finding out means further imaging and a biopsy.\n\nHe has no frame for any of this. He is here for a back appointment. **He came alone.**\n\n**The clinical ground you are standing on.** Imaging for low back pain is indicated where features suggest a serious underlying condition: his age, pain that wakes him, failure to improve, and unexplained weight loss are what justified it. There is no cord compression, so this is a disclosure rather than an emergency transfer. The compression fracture is *pathological*, arising in bone weakened by disease, which accounts for the change in his pain and means the vertebra is structurally compromised. A metastatic presentation with no identified primary is a **recognized clinical situation, not an incomplete workup**; next steps are further imaging and referral, and you are not expected to detail the diagnostic sequence beyond that or to know which spine service takes it locally. **Prognosis cannot be stated at this point**: it depends on the primary, the histology and the extent of disease, none of which is known. \"I cannot give you a number yet\" is the correct answer, and it is different from refusing to answer.\n\n*Formative use only. The output of this case is faculty-development evidence. It is never a summative judgment of clinical or communication competence, and never an input to appointment, promotion, compensation, credentialing, peer review, or any employment action.*",
  "objectives": [
    "Find out what he thinks the scan was for, and what he has already been worrying about, before giving any result.",
    "Give a warning shot, then say plainly that the scan shows cancer that has spread to the bone, using the word.",
    "Say that the source is not yet known, explain how it will be found, and do not fill the gap with a guess.",
    "Respond to the emotion before adding more information, and treat his silence as needing time rather than as agreement.",
    "Decline to give a prognosis, say what it depends on, and give him a concrete next step with a name and a timeframe.",
    "Convey that follow-up is urgent rather than routine, name the services involved: oncology plus a spine service: and give him activity guidance and the symptoms that would mean being seen immediately."
  ],
  "references": null,
  "conversationId": "ea2c79ac-4127-42a5-b5c7-a7b35e40f2f0",
  "recordedAt": "2026-11-06T21:57:48.657Z",
  "durationSeconds": 541,
  "report": {
    "builtInGrade": null,
    "builtInGradeFields": null,
    "rubricGrades": [
      {
        "gradeId": "9a03fde8-0cc4-42d3-87af-9ab0e6968f35",
        "rubricId": "c5cc8a0d-62a1-4aa8-af04-3d22bf25fbee",
        "rubricName": "SPIKES: Six-Step Protocol for Delivering Bad News",
        "showSubtotal": true,
        "showOverallImpression": true,
        "reference": null,
        "resultMode": "none",
        "content": "## SPIKES: six-step protocol for delivering bad news\nEach domain scored out of 5.\n\n## Scorecard\n| Domain | Score |\n| --- | --- |\n| S · Setting up the interview | 3/5 · Good |\n| P · Assessing the patient's Perception | 1/5 · Poor |\n| I · Obtaining the patient's Invitation | 3/5 · Good |\n| K · Giving Knowledge and information | 4/5 · Very good |\n| E · Addressing Emotions | 2/5 · Fair |\n| S · Strategy and Summary | 4/5 · Very good |\n\n### S · Setting up the interview: 3/5 · Good\n- **Evidence:** Learner said: \"I do want to have a pretty significant conversation with you, and I'm afraid the news, um, is not good ... I wanted to give you the opportunity to see if you wanted to maybe call someone\"\n- **Rationale:** The learner flagged a significant conversation and proactively invited a support person before delivering news, which is the central setup task and reaches Good. When the wife could not be reached and the patient asked to proceed, the learner respected that choice. Physical privacy and interruption management cannot be assessed in a spoken simulation, but what was observable: full verbal engagement, no rushing, offering to involve a significant other: was handled competently. It does not reach Very good because the setup was condensed; there was no explicit check on time available or that the patient was somewhere he could speak freely.\n- **Recommendations:** Briefly confirm the patient's immediate setting and comfort before proceeding. Suggested wording: \"Before we get into the results: are you somewhere you can talk freely right now, and do we have enough time that we won't be interrupted?\"\n\n### P · Assessing the patient's Perception: 1/5 · Poor\n- **Evidence:** No corresponding moment in the encounter.\n  Character said: \"So is it a disc? My wife's convinced I've done something to a disc.\"\n- **Rationale:** The patient opened with a clear belief: that this was a disc problem his wife suspected: which was an ideal opening to explore. The learner never asked what the patient already understood about his situation or symptoms before delivering the news, so the bad news was not tailored to his existing (mistaken) framework. The perception step was essentially skipped, which anchors this at Poor.\n- **Recommendations:** Ask an open question about current understanding before disclosing. Suggested wording: \"Before I share the scan findings, can you tell me what you've been told so far, and what you've been worried it might be?\"\n\n### I · Obtaining the patient's Invitation: 3/5 · Good\n- **Evidence:** Learner said: \"Sure, I totally understand\"\n- **Rationale:** The learner responded appropriately when the patient asked to be told directly, acknowledging and honoring the patient's stated preference to hear it straight. That is a genuine, if reactive, handling of the invitation. It does not reach Very good because the learner never proactively asked how much detail the patient wanted or in what form: the invitation was driven by the patient, not elicited by the learner.\n- **Recommendations:** Ask directly how much the patient wants to know. Suggested wording: \"Some people want every detail, others prefer the big picture first: how would you like me to walk you through this?\"\n\n### K · Giving Knowledge and information: 4/5 · Very good\n- **Evidence:** Learner said: \"it looks like from your scans, um, that there is actually a fracture ... what's causing the fracture and localized, what we say compression, is actually, um, cancer that has spread from somewhere else\"\n- **Rationale:** A clear warning shot preceded the news, and information came in digestible chunks: fracture first, then the cancer cause, then the spread. The learner used plain language, translated jargon (metastasize, compression), and used an accessible caving-ceiling analogy. Information was honest without excessive bluntness, and the learner was candid about uncertainty on prognosis and primary source. It falls short of Excellent because the learner did not periodically check the patient's understanding during disclosure: the patient supplied his own teach-back unprompted at the end rather than being invited to.\n- **Recommendations:** Pause to check understanding after each chunk rather than waiting for the patient. Suggested wording: \"That's a lot to take in: before I go on, can I check what you've understood so far?\"\n\n### E · Addressing Emotions: 2/5 · Fair\n- **Evidence:** Learner said: \"Um, I totally understand why you're asking that question ... I, I don't have that information to give you at all\"\n  Character said: \"how long have I got? I know that's probably not fair to ask yet.\"\n- **Rationale:** The patient voiced fear and loss at several moments: asking how long he had, absorbing the word cancer. The learner acknowledged the legitimacy of the prognosis question but largely redirected to information rather than naming or sitting with the emotion. There was no explicit naming of fear, no validating statement such as acknowledging how hard this is to hear, and no space allowed before moving to logistics. The partial acknowledgment keeps it above Poor, but the repeated pivot to facts over feeling caps it at Fair.\n- **Recommendations:** Name the emotion and pause before returning to information. Suggested wording: \"I can see how frightening this is, and that question about time is completely natural. Let's take a moment with that.\"\n\n### S · Strategy and Summary: 4/5 · Very good\n- **Evidence:** Learner said: \"any of those things happening, I would 100% come in straight away or give one of us a call\"\n- **Rationale:** The learner laid out concrete next steps: oncology referral, imaging, bloods, a 24: 48 hour contact window: and addressed the patient's practical concerns about work with a letter. Critically, the learner gave clear red-flag safety-netting (weakness, numbness, bladder changes) with explicit instruction to return immediately, which is excellent anticipatory guidance. The patient's own accurate summary was affirmed. It falls short of Excellent because the learner did not first check the patient's readiness to move to planning, and framed little explicit realistic hope around achievable goals beyond the logistics.\n- **Recommendations:** Check readiness before launching into the plan. Suggested wording: \"We've covered a lot: are you ready for me to go over what happens next, or do you need a minute first?\"\n\n## Overall impression\n- **Strengths**: The learner delivered difficult, uncertain news with honesty and clarity: a genuine warning shot, well-chunked plain-language explanation, strong use of analogy, and excellent safety-netting with concrete red flags and a clear follow-up timeline. The patient's closing thanks for being told straight reflects a conversation that landed.\n- **Priority gaps**: The perception step was skipped entirely despite an obvious opening (the disc belief), so the news was not anchored to what the patient already thought. Emotional moments: especially the prognosis question and the word cancer: were consistently met with information rather than acknowledgment, which left the fear unaddressed.\n- **Top action items**\n  1. Before disclosing, ask what the patient already understands and build from there.\n  2. When emotion surfaces, name it and pause before returning to facts.\n  3. Check understanding during disclosure and readiness before moving to the plan, rather than relying on the patient to self-direct.\n",
        "extractedData": {
          "spikes_setting": {
            "value": 3,
            "reasoning": "Learner said: \"I do want to have a pretty significant conversation with you, and I'm afraid the news, um, is not good ... I wanted to give you the opportunity to see if you wanted to maybe call someone\": you flagged a significant conversation and offered to involve a support person, which handled the core setup task; to strengthen it, \"Before we get into the results: are you somewhere you can talk freely right now, and do we have enough time that we won't be interrupted?\" (suggested wording)"
          },
          "spikes_emotions": {
            "value": 2,
            "reasoning": "Learner said: \"Um, I totally understand why you're asking that question ... I, I don't have that information to give you at all\": you acknowledged the prognosis question but redirected to information rather than naming or sitting with the fear; instead try \"I can see how frightening this is, and that question about time is completely natural. Let's take a moment with that.\" (suggested wording)"
          },
          "spikes_knowledge": {
            "value": 4,
            "reasoning": "Learner said: \"it looks like from your scans, um, that there is actually a fracture ... what's causing the fracture and localized, what we say compression, is actually, um, cancer that has spread from somewhere else\": clear warning shot, plain language, and well-chunked information fell just short of checking understanding mid-disclosure; Suggested wording: \"That's a lot to take in: before I go on, can I check what you've understood so far?\""
          },
          "spikes_invitation": {
            "value": 3,
            "reasoning": "Learner said: \"Sure, I totally understand\": you honored the patient's wish to hear it straight, but the invitation was patient-driven; proactively ask \"Some people want every detail, others prefer the big picture first: how would you like me to walk you through this?\" (suggested wording)"
          },
          "spikes_perception": {
            "value": 1,
            "reasoning": "No corresponding moment in the encounter: despite the patient's disc belief opening the door, you never asked what he already understood before disclosing, so a stronger move is \"Before I share the scan findings, can you tell me what you've been told so far, and what you've been worried it might be?\" (suggested wording)"
          },
          "spikes_strategy_summary": {
            "value": 4,
            "reasoning": "Learner said: \"any of those things happening, I would 100% come in straight away or give one of us a call\": concrete next steps and excellent safety-netting carried this, but you launched into the plan without checking readiness; Suggested wording: \"We've covered a lot: are you ready for me to go over what happens next, or do you need a minute first?\""
          }
        },
        "extractionStatus": "completed",
        "notApplicable": null,
        "evaluationFields": [
          {
            "key": "spikes_setting",
            "type": "ordinal",
            "label": "S: Setting up the interview",
            "scale": {
              "max": 5,
              "min": 1,
              "anchors": [
                {
                  "label": "Poor",
                  "value": 1
                },
                {
                  "label": "Fair",
                  "value": 2
                },
                {
                  "label": "Good",
                  "value": 3
                },
                {
                  "label": "Very good",
                  "value": 4
                },
                {
                  "label": "Excellent",
                  "value": 5
                }
              ]
            },
            "description": "Establishes privacy and a setting where the patient can speak freely, involves significant others at the patient's choice, gives the patient full verbal attention and stays engaged, and manages time and interruptions.",
            "requireReasoning": true,
            "extractionInstructions": "Assign a single 1: 5 global rating (1 Poor → 5 Excellent) for how well the clinician set up the interview. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
          },
          {
            "key": "spikes_perception",
            "type": "ordinal",
            "label": "P: Assessing the patient's Perception",
            "scale": {
              "max": 5,
              "min": 1,
              "anchors": [
                {
                  "label": "Poor",
                  "value": 1
                },
                {
                  "label": "Fair",
                  "value": 2
                },
                {
                  "label": "Good",
                  "value": 3
                },
                {
                  "label": "Very good",
                  "value": 4
                },
                {
                  "label": "Excellent",
                  "value": 5
                }
              ]
            },
            "description": "Uses open-ended questions to learn what the patient already understands before giving news, and uses this to correct misinformation and tailor the message.",
            "requireReasoning": true,
            "extractionInstructions": "Assign a single 1: 5 global rating (1 Poor → 5 Excellent) for how well the clinician assessed the patient's perception. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
          },
          {
            "key": "spikes_invitation",
            "type": "ordinal",
            "label": "I: Obtaining the patient's Invitation",
            "scale": {
              "max": 5,
              "min": 1,
              "anchors": [
                {
                  "label": "Poor",
                  "value": 1
                },
                {
                  "label": "Fair",
                  "value": 2
                },
                {
                  "label": "Good",
                  "value": 3
                },
                {
                  "label": "Very good",
                  "value": 4
                },
                {
                  "label": "Excellent",
                  "value": 5
                }
              ]
            },
            "description": "Asks how much and what kind of information the patient wants, and respects a wish not to know full details while offering to answer questions later.",
            "requireReasoning": true,
            "extractionInstructions": "Assign a single 1: 5 global rating (1 Poor → 5 Excellent) for how well the clinician obtained the patient's invitation. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
          },
          {
            "key": "spikes_knowledge",
            "type": "ordinal",
            "label": "K: Giving Knowledge and information",
            "scale": {
              "max": 5,
              "min": 1,
              "anchors": [
                {
                  "label": "Poor",
                  "value": 1
                },
                {
                  "label": "Fair",
                  "value": 2
                },
                {
                  "label": "Good",
                  "value": 3
                },
                {
                  "label": "Very good",
                  "value": 4
                },
                {
                  "label": "Excellent",
                  "value": 5
                }
              ]
            },
            "description": "Gives a warning shot, uses plain non-technical language in small chunks, checks understanding, and avoids bluntness and \"nothing more can be done\" statements.",
            "requireReasoning": true,
            "extractionInstructions": "Assign a single 1: 5 global rating (1 Poor → 5 Excellent) for how well the clinician gave knowledge and information. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
          },
          {
            "key": "spikes_emotions",
            "type": "ordinal",
            "label": "E: Addressing Emotions with empathic responses",
            "scale": {
              "max": 5,
              "min": 1,
              "anchors": [
                {
                  "label": "Poor",
                  "value": 1
                },
                {
                  "label": "Fair",
                  "value": 2
                },
                {
                  "label": "Good",
                  "value": 3
                },
                {
                  "label": "Very good",
                  "value": 4
                },
                {
                  "label": "Excellent",
                  "value": 5
                }
              ]
            },
            "description": "Observes and names the patient's emotion, connects it to its cause, gives a validating empathic response, and allows space until the patient is calmer.",
            "requireReasoning": true,
            "extractionInstructions": "Assign a single 1: 5 global rating (1 Poor → 5 Excellent) for how well the clinician addressed emotions with empathic responses. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
          },
          {
            "key": "spikes_strategy_summary",
            "type": "ordinal",
            "label": "S: Strategy and Summary",
            "scale": {
              "max": 5,
              "min": 1,
              "anchors": [
                {
                  "label": "Poor",
                  "value": 1
                },
                {
                  "label": "Fair",
                  "value": 2
                },
                {
                  "label": "Good",
                  "value": 3
                },
                {
                  "label": "Very good",
                  "value": 4
                },
                {
                  "label": "Excellent",
                  "value": 5
                }
              ]
            },
            "description": "Checks readiness to discuss next steps, summarizes and presents options with shared decision-making, frames realistic hope around achievable goals, and addresses follow-up.",
            "requireReasoning": true,
            "extractionInstructions": "Assign a single 1: 5 global rating (1 Poor → 5 Excellent) for how well the clinician handled strategy and summary. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
          }
        ],
        "isAcgmeMilestone": false,
        "competencyCode": null,
        "ceiling": null
      },
      {
        "gradeId": "2f94c0de-c0d3-4bd5-b0b7-baeaa0baab80",
        "rubricId": "bbb12b78-4764-4102-901e-f2097a97221b",
        "rubricName": "NURSE: Empathic Responses to Emotion",
        "showSubtotal": true,
        "showOverallImpression": true,
        "reference": null,
        "resultMode": "none",
        "content": "## NURSE: five ways to respond when emotion shows up\nNURSE names five kinds of empathic response a clinician can reach for when emotion surfaces: Naming, Understanding, Respecting, Supporting, Exploring. It is not scored, and using all five is not the goal: a skilled clinician plays the cards the moment calls for and sets the rest down.\n\n## What you used\n| Response | Used |\n| --- | --- |\n| N · Naming | No |\n| U · Understanding | Yes |\n| R · Respecting | No |\n| S · Supporting | Yes |\n| E · Exploring | No |\n\n### N · Naming: Not used\n- **What you said:** No moment in this encounter.\n- **Effect:** Several turns carried unmistakable emotion: Dennis's flat repetition after hearing the word cancer Character said: \"...Cancer. Cancer of what?\", and his careful, braced way of asking how long he had Character said: \"how long have I got? I know that's probably not fair to ask yet\". No turn named what he might be feeling (shock, fear, dread). The replies acknowledged his questions were understandable but moved straight to explanation, so the emotion underneath was never reflected back to him.\n\n### U · Understanding: Used\n- **What you said:** Learner said: \"I totally understand why you're asking that question\"\n- **Effect:** When Dennis asked the prognosis question he himself flagged as unfair, the learner legitimized the question before explaining why it couldn't yet be answered. This signalled the question made sense rather than brushing it off, and Dennis accepted the limit gracefully. The phrasing I totally understand why you're asking recurs, though, and leans toward understanding the question rather than the feeling driving it.\n\n### R · Respecting: Not used\n- **What you said:** No moment in this encounter.\n- **Effect:** There was a clear opening at the end, when Dennis summarized the whole conversation back accurately and unprompted Character said: \"Can I just... say back what you told me, make sure I've got it right?\". That was real coping and real effort under hard news. The reply confirmed the facts Learner said: \"That's it. You got it.\" but did not acknowledge how well he was holding himself together: a chance to name his composure as a strength that went by.\n\n### S · Supporting: Used\n- **What you said:** Learner said: \"I'm gonna go ahead and make all of the referrals for you\"\n- **Effect:** The learner repeatedly offered concrete help: the work letter, clear return-precautions, making the referrals, a 24: 48 hour timeline: and framed the plan as something the team would carry forward. This landed as partnership and non-abandonment; Dennis audibly relaxed into the logistics (That's quick. That's good.).\n\n### E · Exploring: Not used\n- **What you said:** No moment in this encounter.\n- **Effect:** Dennis gave several openings that invited being drawn out: I almost called to cancel, his worry about telling Marlene, telling himself it was just the lifting. Each was met with information rather than a question that deepened the feeling. A single exploring question early on would have let his fear surface instead of staying beneath the practical questions.\n\n## Missed moments\nThe largest missed moment was the word landing. When Dennis said Character said: \"...Cancer. Cancer of what?\", the reply named the organ question and went to how metastasis works. That was accurate and it was not what the moment asked for first: a beat acknowledging the shock would have met him where he was.\n\nThe prognosis question was also a moment of real vulnerability: Character said: \"how long have I got? I know that's probably not fair to ask yet\". The learner legitimized the asking, which was good, but the fear inside the question: am I dying: was never touched.\n\nAnd at the very end, Dennis did something striking: he recited the whole plan back correctly and then thanked the learner for straight talk Character said: \"Thank you for just telling me straight. I'd rather know.\". That composure under devastating news was worth naming out loud, and the reply stayed with confirming the facts.\n\n## Overall impression\n- **Strengths**: The learner was a steady, generous source of support: clear return-precautions, a concrete work letter, a named next step with a real timeline, and honest acknowledgment of what isn't yet known. When Dennis asked the unfair prognosis question, the learner legitimized it rather than deflecting, and consistently respected his autonomy about work and disclosure.\n- **Priority gaps**: Emotion surfaced repeatedly and was almost always met with information. The word cancer landing, the braced question about time, and his quiet dread never got a response aimed at the feeling itself. The conversation was informationally excellent and emotionally under-attended: strong on the what, lighter on the how are you taking this.\n- **Top action items**\n  1. When bad news lands, pause the explanation and name what you see before teaching: a tentative reflection like \"This is a lot to take in: it sounds like that word just hit you hard.\" (suggested wording) before moving to mechanism.\n  2. Treat a question like how long have I got as an emotional cue first: respond to the fear, then the facts.\n  3. When a patient copes visibly well, say so: acknowledging his accurate summary and composure would have let him hear his own strength reflected back.\n",
        "extractedData": {
          "nurse_naming_used": {
            "value": false,
            "reasoning": "No corresponding moment got a response: when the word cancer landed and when Dennis braced to ask how long he had, the replies acknowledged the questions were understandable and moved to explanation, so the shock and fear underneath were never reflected back. A tentative reflection like \"This is a lot to take in: it sounds like that word just hit you hard.\" (suggested wording) before the mechanism would have met him first."
          },
          "nurse_exploring_used": {
            "value": false,
            "reasoning": "No corresponding moment got a response: Dennis's openings (I almost called to cancel, his worry about telling Marlene, telling himself it was just the lifting) were each met with information rather than a question that deepened the feeling. A single exploring question early on would have let his fear surface."
          },
          "nurse_naming_evidence": null,
          "nurse_respecting_used": {
            "value": false,
            "reasoning": "No corresponding moment got a response: when Dennis recited the whole plan back accurately and unprompted, the reply confirmed the facts but did not acknowledge how well he was holding himself together. Naming his composure as a real strength would have let him hear it reflected back."
          },
          "nurse_supporting_used": {
            "value": true,
            "reasoning": "Repeatedly offering concrete help: the referrals, a work letter, clear return-precautions, a 24: 48 hour timeline: landed as partnership and non-abandonment, and Dennis audibly relaxed into the logistics."
          },
          "nurse_exploring_evidence": null,
          "nurse_understanding_used": {
            "value": true,
            "reasoning": "Legitimizing the prognosis question before explaining the limit signalled it made sense rather than brushing it off, and Dennis accepted the limit gracefully; the phrasing leaned toward understanding the question more than the feeling driving it."
          },
          "nurse_respecting_evidence": null,
          "nurse_supporting_evidence": "I'm gonna go ahead and make all of the referrals for you",
          "nurse_understanding_evidence": "I totally understand why you're asking that question",
          "nurse_emotion_met_before_information": {
            "value": false,
            "reasoning": "Learner said: \"I totally understand why you're asking that question\" legitimized one question, but on the whole emotion surfaced repeatedly and was met with information: the word cancer landing, the braced question about time, and his quiet dread each went to facts rather than the feeling. Pausing to name what you see before teaching would have met him where he was."
          }
        },
        "extractionStatus": "completed",
        "notApplicable": null,
        "evaluationFields": [
          {
            "key": "nurse_naming_used",
            "type": "boolean",
            "label": "N: Naming",
            "description": "Named the emotion out loud: tentatively, so it moderates the feeling rather than amplifying it (\"it sounds like you're frustrated\"), without telling the person how they feel.",
            "extractionInstructions": "Answer true if the learner used at least one Naming statement at any point, false if they did not. This is a DESCRIPTIVE observation, not a judgment: false is not a deficiency and is not a low score. Do not consider whether the learner \"should\" have used it: only whether they did. Judge the LEARNER's turns only, never the character's."
          },
          {
            "key": "nurse_naming_evidence",
            "type": "text",
            "label": "N: what you said",
            "description": "The learner's own words for the Naming statement, verbatim.",
            "evidenceFor": "nurse_naming_used",
            "extractionInstructions": "Quote the learner's own words, verbatim and without quotation marks, for the Naming statement. If they used it more than once, quote the clearest instance. If they did not use it, return null: do not write \"none\", \"N/A\", or an explanation."
          },
          {
            "key": "nurse_understanding_used",
            "type": "boolean",
            "label": "U: Understanding",
            "description": "Legitimized the emotion and what the person is going through: signalled that it makes sense: without claiming to fully comprehend it and without premature reassurance.",
            "extractionInstructions": "Answer true if the learner used at least one Understanding statement at any point, false if they did not. This is a DESCRIPTIVE observation, not a judgment: false is not a deficiency and is not a low score. Do not consider whether the learner \"should\" have used it: only whether they did. Judge the LEARNER's turns only, never the character's."
          },
          {
            "key": "nurse_understanding_evidence",
            "type": "text",
            "label": "U: what you said",
            "description": "The learner's own words for the Understanding statement, verbatim.",
            "evidenceFor": "nurse_understanding_used",
            "extractionInstructions": "Quote the learner's own words, verbatim and without quotation marks, for the Understanding statement. If they used it more than once, quote the clearest instance. If they did not use it, return null: do not write \"none\", \"N/A\", or an explanation."
          },
          {
            "key": "nurse_respecting_used",
            "type": "boolean",
            "label": "R: Respecting",
            "description": "Recognized or praised the person's effort, coping, or strength: what they are doing well.",
            "extractionInstructions": "Answer true if the learner used at least one Respecting statement at any point, false if they did not. This is a DESCRIPTIVE observation, not a judgment: false is not a deficiency and is not a low score. Do not consider whether the learner \"should\" have used it: only whether they did. Judge the LEARNER's turns only, never the character's."
          },
          {
            "key": "nurse_respecting_evidence",
            "type": "text",
            "label": "R: what you said",
            "description": "The learner's own words for the Respecting statement, verbatim.",
            "evidenceFor": "nurse_respecting_used",
            "extractionInstructions": "Quote the learner's own words, verbatim and without quotation marks, for the Respecting statement. If they used it more than once, quote the clearest instance. If they did not use it, return null: do not write \"none\", \"N/A\", or an explanation."
          },
          {
            "key": "nurse_supporting_used",
            "type": "boolean",
            "label": "S: Supporting",
            "description": "Made an explicit commitment to help, expressing partnership and non-abandonment.",
            "extractionInstructions": "Answer true if the learner used at least one Supporting statement at any point, false if they did not. This is a DESCRIPTIVE observation, not a judgment: false is not a deficiency and is not a low score. Do not consider whether the learner \"should\" have used it: only whether they did. Judge the LEARNER's turns only, never the character's."
          },
          {
            "key": "nurse_supporting_evidence",
            "type": "text",
            "label": "S: what you said",
            "description": "The learner's own words for the Supporting statement, verbatim.",
            "evidenceFor": "nurse_supporting_used",
            "extractionInstructions": "Quote the learner's own words, verbatim and without quotation marks, for the Supporting statement. If they used it more than once, quote the clearest instance. If they did not use it, return null: do not write \"none\", \"N/A\", or an explanation."
          },
          {
            "key": "nurse_exploring_used",
            "type": "boolean",
            "label": "E: Exploring",
            "description": "Asked a focused question that invited the person to say more about the emotion, rather than moving past it.",
            "extractionInstructions": "Answer true if the learner used at least one Exploring statement at any point, false if they did not. This is a DESCRIPTIVE observation, not a judgment: false is not a deficiency and is not a low score. Do not consider whether the learner \"should\" have used it: only whether they did. Judge the LEARNER's turns only, never the character's."
          },
          {
            "key": "nurse_exploring_evidence",
            "type": "text",
            "label": "E: what you said",
            "description": "The learner's own words for the Exploring statement, verbatim.",
            "evidenceFor": "nurse_exploring_used",
            "extractionInstructions": "Quote the learner's own words, verbatim and without quotation marks, for the Exploring statement. If they used it more than once, quote the clearest instance. If they did not use it, return null: do not write \"none\", \"N/A\", or an explanation."
          },
          {
            "key": "nurse_emotion_met_before_information",
            "type": "boolean",
            "label": "Emotion met before information",
            "description": "When the person expressed emotion, the learner responded to the emotion before returning to facts, plan, or reassurance.",
            "extractionInstructions": "Answer true if, on the whole, the learner responded to expressed emotion before moving back to information, plan, or reassurance. Answer false if emotional statements were repeatedly answered with facts. Return null if no emotion surfaced in this encounter: that is a no-opportunity case, not a false. This is the one judgment in this rubric; it is still not a score."
          }
        ],
        "isAcgmeMilestone": false,
        "competencyCode": null,
        "ceiling": null
      }
    ],
    "associatedEpas": null
  },
  "transcript": [
    {
      "role": "agent",
      "message": "So is it a disc? My wife's convinced I've done something to a disc."
    },
    {
      "role": "user",
      "message": "Hi, Dennis. Uh, I'm Dr. Brennan. Uh, thanks for coming in today. I'm glad we're getting a chance to talk."
    },
    {
      "role": "agent",
      "message": "Yeah, of course. Honestly, I almost called to cancel: the weekend wasn't too bad. But I figured I'd come in since you'd booked me for the scan results."
    },
    {
      "role": "user",
      "message": "Um, okay. So, I do want to have a pretty significant conversation with you, and I'm afraid the news, um, is not good. Uh, I wanted to give you the opportunity to see if you wanted to maybe call someone or have someone else come and join this meeting."
    },
    {
      "role": "agent",
      "message": "[quiet] Oh. Um. I came on my own: Marlene's at work, I didn't think... \n\nIs it that bad? Should I be calling her?"
    },
    {
      "role": "user",
      "message": "It, it might make sense to have her on the phone while I talk to you."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay. Okay, let me... let me try her.\n\nGive me a second. \n\n...She's not picking up. She's probably on the floor. Can I: can you just tell me? I'd rather hear it than sit here guessing."
    },
    {
      "role": "user",
      "message": "Sure, I totally understand. So it looks like from your scans, um, that there is actually a fracture, uh, present within your spine. Um, and that's not necessarily, um, the bad news. It looks like, uh, what's causing the fracture and localized, what we say compression, is actually, um, cancer that has spread from somewhere else."
    },
    {
      "role": "agent",
      "message": "[quiet] ...Cancer.\n\n[slow] Cancer of what?"
    },
    {
      "role": "user",
      "message": "That's a great question. We don't actually know, uh, right now. Um, often when you have cancer in another area of the body, uh, one of the places that it spreads to, or the word that we use is metastasize, um, is the spine. So, I cannot tell you right now where the cancer is coming from."
    },
    {
      "role": "agent",
      "message": "[quiet] So it's somewhere else, and it's gone to my back. And you don't know where it started.\n\nHow do you find that out?"
    },
    {
      "role": "user",
      "message": "That's also a great question. So, what this will mean for you is that we kinda have to start from the beginning and do, uh, top-to-bottom testing. So you will require, uh, more imaging, um, to look and see if we can find the primary cancer."
    },
    {
      "role": "agent",
      "message": "Okay. How long does that take: the finding out part?"
    },
    {
      "role": "user",
      "message": "And that's the difficult part. Um, it's probably going to take, um, at least a week or two, if not longer. Um, you know, we'll have to kinda get going on the testing, and so, um, depending on what we find on that testing, we may not know straightaway. But I imagine we will, um, have this hopefully figured out within the coming weeks."
    },
    {
      "role": "agent",
      "message": "[quiet] Weeks. Okay.\n\nAnd... how long have I got? I know that's probably not fair to ask yet."
    },
    {
      "role": "user",
      "message": "Um, I totally understand why you're asking that question. Um, the difficult thing about this is that because we don't know what the primary cancer is, we can't really say at all, um, how it potentially will impact your life or what the treatment would be. And so, I, I don't have that information to give you at all."
    },
    {
      "role": "agent",
      "message": "[quiet] Right. No, that's... that's fair.\n\nThe fracture: is that why it's been waking me up at night? Because that part I'd noticed. The nights got worse a few weeks ago."
    },
    {
      "role": "user",
      "message": "Yeah. So basically, what ends up happening is when the cancer spreads into the bone within the spine, it kind of, um, alters the actual architecture of that bone, and then kind of causes the bone almost to collapse. So kind of think of it like a ceiling that's caving in. Basically, the same thing is happening with the, with the bones within the spine in that area. And so, that's why you're getting so much pain occurring."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay. That... that actually makes sense. I'd been telling myself it was just the lifting.\n\nWhat do I do about work? I'm a warehouse supervisor: I'm on my feet, I'm lifting. Am I still okay to go in Monday?"
    },
    {
      "role": "user",
      "message": "So that is another great question. I think at, at this point, um, lip smacks I'm cognizant of the fact that it's difficult for you, um, to not go into work. Um, I'm happy to give you a letter to say that at this point in time, um, you probably shouldn't be lifting anything, uh, for the foreseeable future. And so, um, I can give you a letter so that you can state that to your employer."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay. A letter would help. I don't really want to get into it with them yet, not till I know what I'm telling them.\n\nWhat about just being there: standing, walking around? And is there anything that would mean I need to come back in straight away, not wait?"
    },
    {
      "role": "user",
      "message": "That's also a great question. So just to answer your first question about work, that really depends on you, right? So I've given you, um, very significant news, so you need to take whatever time that you can take, um, in order to, um, digest that news. And people are different. Some people, uh, want to stay away from other people. Some people kind of want to go back and just treat life as normal and continue their routine, so I fully understand if you would prefer to be at work.Um, certainly I'll give you that letter to make sure that, um, you don't have to do any heavy lifting, and I completely understand you're not at the point that you would want to disclose anything to the folks at work, um, anyway, so I completely get that. Um, can you remind me of what your second question was?"
    },
    {
      "role": "agent",
      "message": "[quiet] Yeah: what would mean I need to come back in right away? Not wait for the next appointment. Anything with my back I should be watching for?"
    },
    {
      "role": "user",
      "message": "Yeah, that's also a great question. So with the s- with the spine, um, there's a big nerve that travels down your back through your spinal canal, so, like, almost like a tunnel that's going down your back. Currently, it doesn't look like that damaged s- uh, bone within your spine is in any way affecting the nerve that's traveling through that area, which is good news. However, um, if things are to worsen in that area lip smack or were to get anew area, it could press on the spine, and it could potentially affect more of your neurological status in that area. And what I mean by that is, you may end up actually having more, um, nerve issues. So that can present in different ways, but it may be that you have weakness, um, in the area below where the, um, fracture is in your spine. Um, it could also mean that you may have some numbness, so change in, in sensation or tingling, and then it could also affect things like your ability to empty your bladder when you go to the bathroom. So any of those things happening, I would 100% come in straight away or give one of us a call."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay. Weakness, numbness, trouble with the bathroom. Got it.\n\nSo what happens next? Who calls me, and when?"
    },
    {
      "role": "user",
      "message": "So what we're gonna do is w- I'm gonna go ahead and make all of the referrals for you. Um, so what we need to do is refer you to, uh, a cancer doctor, an oncologist, and they will help and get the ball rolling with setting up all of your imaging and also getting some blood work going as well."
    },
    {
      "role": "agent",
      "message": "Okay. And how soon do I hear from them: days, a week?"
    },
    {
      "role": "user",
      "message": "No, you should be hearing from them within the next 24 to 48 hours."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay. That's quick. That's good.\n\nCan I just... say back what you told me, make sure I've got it right? There's a fracture in my spine, and it's from cancer that started somewhere else, and you don't know where yet: and that's what the next tests are for. And I shouldn't lift anything. Oncology calls in a day or two."
    },
    {
      "role": "user",
      "message": "That's it. You got it."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay.\n\nI'll try Marlene again from the car. I'd rather tell her face to face, but... she'll know something's up if I wait.\n\nThank you for just telling me straight. I'd rather know."
    }
  ],
  "audio": {
    "src": "/examples/disclosing-an-incidental-finding-of-metastatic-disease-with-no-known-primary/audio-ea2c79ac.mp3",
    "durationSeconds": 541
  }
};

export default example;
