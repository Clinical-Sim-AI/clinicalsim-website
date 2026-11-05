// Snapshot from the user-selected production conversation, read through Supabase MCP in a READ ONLY transaction.
// Source: production conversation efa995b5-8427-4486-8cca-d3017480b2b1
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
  "conversationId": "efa995b5-8427-4486-8cca-d3017480b2b1",
  "recordedAt": "2026-11-04T14:35:41.277Z",
  "durationSeconds": 586,
  "report": {
    "builtInGrade": null,
    "builtInGradeFields": null,
    "rubricGrades": [
      {
        "gradeId": "51952059-2b4f-4495-860a-c8043fb50cd5",
        "rubricId": "c5cc8a0d-62a1-4aa8-af04-3d22bf25fbee",
        "rubricName": "SPIKES: Six-Step Protocol for Delivering Bad News",
        "showSubtotal": true,
        "showOverallImpression": true,
        "reference": null,
        "resultMode": "none",
        "content": "## SPIKES: six-step protocol for delivering bad news\nEach domain scored out of 5.\n\n## Scorecard\n| Domain | Score |\n| --- | --- |\n| S · Setting up the interview | 3/5 · Good |\n| P · Assessing the patient's Perception | 4/5 · Very good |\n| I · Obtaining the patient's Invitation | 3/5 · Good |\n| K · Giving Knowledge and information | 4/5 · Very good |\n| E · Addressing Emotions | 2/5 · Fair |\n| S · Strategy and Summary | 4/5 · Very good |\n\n### S · Setting up the interview: 3/5 · Good\n- **Evidence:** Learner said: \"do you want to call your wife on the phone so that she can listen in while we're chatting, or would you like to talk to her later?\"\n- **Rationale:** The learner addressed involvement of a significant other well, offering to call the wife before disclosure and remaining flexible about how and when that happened. The learner also stayed verbally engaged and corrected an interruption graciously. However, the physical setting, privacy, and any time constraints were never established or named, and much of what Setting involves (seating, undivided attention through nonverbal presence) cannot be surfaced here. On the assessable behaviors, the task was competently done with gaps, placing this at Good.\n- **Recommendations:** Briefly confirm the setting and time available at the outset. Suggested wording: \"Before we start, we've got this room to ourselves and about twenty minutes: is this an okay place for you to talk?\"\n\n### P · Assessing the patient's Perception: 4/5 · Very good\n- **Evidence:** Learner said: \"is there a reason why you thought that it was a disc specifically?\"\n  Character said: \"Just... lifting, I guess. I've been at the warehouse thirty years\"\n- **Rationale:** The learner opened by exploring the patient's own belief that it was a disc, drawing out his reasoning (the lifting, thirty years at the warehouse) and connecting his symptoms (the weight loss, the night pain) to the decision to scan. This elicited the patient's understanding before delivering news and tailored the disclosure. It falls short of Excellent only because the exploration was fairly brief and did not fully probe what he feared or expected the scan might show.\n- **Recommendations:** Keep eliciting the patient's own framing; one more open question about what he worried the scan might find would deepen it. Suggested wording: \"When you came in for the scan, was there anything you were worried it might show?\"\n\n### I · Obtaining the patient's Invitation: 3/5 · Good\n- **Evidence:** Learner said: \"are you the kind of person that would like more details now, or, or do you need a little bit more time?\"\n- **Rationale:** The learner did check how much the patient wanted: asking whether he was the kind of person who wanted more details now or needed time. This is a genuine invitation attempt, which reaches Good. It came, however, after the core diagnosis had already been delivered rather than before, and it was folded into a reassurance about having a plan, so it functioned more as a pacing check than a true pre-disclosure invitation. That sequencing caps it below Very good.\n- **Recommendations:** Ask how much detail the patient wants before disclosing, not after. Suggested wording: \"Before I go into the results, some people want every detail and others want the big picture first: what works best for you?\"\n\n### K · Giving Knowledge and information: 4/5 · Very good\n- **Evidence:** Learner said: \"what we saw were some tumors in the spine that are concerning for cancer ... this is cancer that has spread from somewhere\"\n- **Rationale:** The learner gave a clear warning shot before disclosing, used plain language (tumors, cancer that has spread, bone made weak), and delivered information in manageable chunks, checking understanding along the way. The explanation of why the pain changed and what symptoms warrant the ER was accurate and well matched to the patient's vocabulary. It stops short of Excellent because the initial disclosure was somewhat dense: the warning shot and the news arrived close together without a pause to let cancer land before continuing with the spread.\n- **Recommendations:** After the warning shot, deliver the single headline and pause before adding detail. Suggested wording: \"I'm afraid the scan shows something serious. (pause) It showed cancer. (pause) Let me explain what that means.\"\n\n### E · Addressing Emotions: 2/5 · Fair\n- **Evidence:** Learner said: \"definitely don't feel that way ... this wasn't an outcome that we expected\"\n  Character said: \"Should I have brought Marlene? I feel stupid now, coming on my own.\"\n- **Rationale:** The learner used acknowledging phrases (I know this is very hard news to hear, I can understand this is very difficult) but these were verbal reassurances repeated somewhat formulaically rather than true empathic engagement. At the moments of highest emotion: the patient falling silent after the word cancer, and his self-blame about not bringing Marlene and feeling stupid: the learner moved quickly to logistics or reassurance rather than naming the emotion, identifying its source, and allowing silence to sit. The patient's feeling was never explicitly named, and no space was held before pressing on. This minimal, flawed attempt places it at Fair.\n- **Recommendations:** Name the emotion and its source, then stay silent and let the patient respond before continuing. Suggested wording: \"I can see this has knocked the wind out of you: hearing the word cancer when you came in expecting a disc. Take whatever time you need.\"\n\n### S · Strategy and Summary: 4/5 · Very good\n- **Evidence:** Learner said: \"we do treat this with some urgency ... I'm gonna give them a call directly to let them know what the situation is so that they can expedite your appointment\"\n  Character said: \"say it back, make sure I've got it ... That right?\"\n- **Rationale:** The learner built a concrete, shared plan: imaging, oncology and spine referrals, direct calls to expedite, a work note, pain medication, activity restrictions, and explicit red-flag return precautions: and framed realistic short-term goals when the patient asked what he could do today. The learner responded to the patient's need to know who would call and when, and invited questions throughout, with the patient teaching back accurately. It reaches short of Excellent because prognosis questions, though handled honestly, were deferred without acknowledging the distress underneath the how long have I got question before pivoting to the plan.\n- **Recommendations:** Check readiness and acknowledge the feeling behind a prognosis question before moving to logistics. Suggested wording: \"That's the question weighing on you most, and I wish I could answer it today. Before we talk about the plan: how are you doing right now?\"\n\n## Overall impression\n- **Strengths**: The learner structured the encounter well: a genuine perception check up front, a clear warning shot, plain-language disclosure, and an organized, actionable plan with red-flag precautions the patient could confidently repeat back. The handling of the wife's involvement was flexible and patient-led.\n- **Priority gaps**: The weakest thread was emotion. At the hardest moments: the silence after cancer, the self-blame about coming alone: the learner reached for reassurance and logistics instead of naming the feeling and holding space. The invitation also came after disclosure rather than before.\n- **Top action items**\n  1. At moments of high emotion, name the feeling and its source, then pause and let silence do the work before moving on.\n  2. Ask how much detail the patient wants before delivering the diagnosis.\n  3. After the warning shot, give one headline sentence and pause before adding the spread and next steps.\n",
        "extractedData": {
          "spikes_setting": {
            "value": 3,
            "reasoning": "Learner said: \"do you want to call your wife on the phone so that she can listen in while we're chatting, or would you like to talk to her later?\": you involved the wife flexibly but never confirmed the setting or time, so try \"Before we start, we've got this room to ourselves and about twenty minutes: is this an okay place for you to talk?\" (suggested wording)"
          },
          "spikes_emotions": {
            "value": 2,
            "reasoning": "Learner said: \"definitely don't feel that way ... this wasn't an outcome that we expected\": reassurances were formulaic and the emotion was never named or given space; try \"I can see this has knocked the wind out of you: hearing the word cancer when you came in expecting a disc. Take whatever time you need.\" (suggested wording)"
          },
          "spikes_knowledge": {
            "value": 4,
            "reasoning": "Learner said: \"what we saw were some tumors in the spine that are concerning for cancer ... this is cancer that has spread from somewhere\": clear warning shot and plain language, but the news was dense; pace it with \"I'm afraid the scan shows something serious. (pause) It showed cancer. (pause) Let me explain what that means.\" (suggested wording)"
          },
          "spikes_invitation": {
            "value": 3,
            "reasoning": "Learner said: \"are you the kind of person that would like more details now, or, or do you need a little bit more time?\": this was a genuine invitation but came after disclosure, so ask earlier using \"Before I go into the results, some people want every detail and others want the big picture first: what works best for you?\" (suggested wording)"
          },
          "spikes_perception": {
            "value": 4,
            "reasoning": "Learner said: \"is there a reason why you thought that it was a disc specifically?\": you drew out his own framing well; deepen it next time with \"When you came in for the scan, was there anything you were worried it might show?\" (suggested wording)"
          },
          "spikes_strategy_summary": {
            "value": 4,
            "reasoning": "Learner said: \"we do treat this with some urgency ... I'm gonna give them a call directly to let them know what the situation is so that they can expedite your appointment\": a concrete, shared plan with red-flag precautions, but acknowledge the prognosis distress first using \"That's the question weighing on you most, and I wish I could answer it today. Before we talk about the plan: how are you doing right now?\" (suggested wording)"
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
            "extractionInstructions": "Assign a single 1-5 global rating (1 Poor → 5 Excellent) for how well the clinician set up the interview. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
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
            "extractionInstructions": "Assign a single 1-5 global rating (1 Poor → 5 Excellent) for how well the clinician assessed the patient's perception. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
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
            "extractionInstructions": "Assign a single 1-5 global rating (1 Poor → 5 Excellent) for how well the clinician obtained the patient's invitation. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
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
            "extractionInstructions": "Assign a single 1-5 global rating (1 Poor → 5 Excellent) for how well the clinician gave knowledge and information. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
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
            "extractionInstructions": "Assign a single 1-5 global rating (1 Poor → 5 Excellent) for how well the clinician addressed emotions with empathic responses. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
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
            "extractionInstructions": "Assign a single 1-5 global rating (1 Poor → 5 Excellent) for how well the clinician handled strategy and summary. Weigh the listed behaviors together as one holistic judgment; rate only behaviors evidenced in the transcript."
          }
        ],
        "isAcgmeMilestone": false,
        "competencyCode": null,
        "ceiling": null
      },
      {
        "gradeId": "a2712084-622f-43a1-b1b0-89c21775c36f",
        "rubricId": "bbb12b78-4764-4102-901e-f2097a97221b",
        "rubricName": "NURSE: Empathic Responses to Emotion",
        "showSubtotal": true,
        "showOverallImpression": true,
        "reference": null,
        "resultMode": "none",
        "content": "## NURSE: five ways to respond when emotion shows up\n\nNURSE is a set of cards a clinician plays as the moment calls for, not a sequence or checklist. It is not scored, and using all five is not the goal: a skilled clinician picks the responses the moment calls for. The learning below lives in whether the emotional moments got a response, not in how many elements appeared.\n\n## What you used\n\n| Response | Used |\n| --- | --- |\n| N · Naming | Yes |\n| U · Understanding | Yes |\n| R · Respecting | Yes |\n| S · Supporting | Yes |\n| E · Exploring | No: no opportunity |\n\n### N · Naming: Used\n- **What you said:** Learner said: \"I know this is very hard news to, to hear\"\n- **Effect:** When the patient fell silent on hearing the diagnosis, the learner named the difficulty of hearing the news. The phrasing was accurate and not overstated, though it named the situation more than the patient's own emotion. Later, Learner said: \"we know that there is something ... we don't have all the answers yet\" named the specific tension of knowing something is wrong without having answers: this landed closer to what the patient was actually struggling with.\n\n### U · Understanding: Used\n- **What you said:** Learner said: \"definitely don't feel that way ... this wasn't an outcome that we expected\"\n- **Effect:** When the patient voiced embarrassment about coming alone, the learner legitimized the situation and reframed it so the patient was not at fault, which met the self-blame directly rather than brushing past it.\n\n### R · Respecting: Used\n- **What you said:** Learner said: \"It sounds like you have a very good understanding of what's going on\"\n- **Effect:** After the patient carefully read back the whole plan, the learner acknowledged the patient's grasp of a frightening amount of information. This recognized a real coping effort at a moment when the patient was working hard to stay oriented.\n\n### S · Supporting: Used\n- **What you said:** Learner said: \"I'm gonna give them a call directly ... get you in as soon as possible\"\n- **Effect:** The learner made concrete commitments: organizing appointments, calling specialists directly to expedite, offering to speak with the wife: and closed with an explicit non-abandonment message Learner said: \"please feel free to give us a call back ... I'm happy to, to discuss everything\". These were specific rather than generic, so the partnership felt real.\n\n### E · Exploring: Not used\n- **What you said:** No moment in this encounter.\n- **Effect:** The patient volunteered several openings that could have been deepened with a focused question. The learner responded warmly with acknowledgment and reassurance, but did not invite the patient to say more. This was not a missed obligation: the conversation did not require it: but an exploring question at one of these moments might have surfaced what the patient most needed before leaving.\n\n## Missed moments\n\nTwo moments pulled toward information before the emotion underneath them was met.\n\nWhen the patient asked the hardest question: Character said: \"how long have I got? I know that's the question nobody wants\": the learner answered the content and briefly named the difficulty, but moved to the plan quickly. The prognosis question is almost always an emotional one as much as a factual one; a beat acknowledging the fear in asking it, before the pivot to next steps, would have met the person as well as the question.\n\nWhen the patient surfaced the core distress of the whole encounter: Character said: \"I don't know what I'm telling her yet. That's the problem\": the learner responded with Learner said: \"I can imagine that this is very difficult\", then immediately proposed discussing the short-term plan. The plan was genuinely what the patient asked for and the pivot was responsive. Still, that disclosure was an opening to explore what the patient feared most about the conversation with Marlene, and it went to logistics instead. A single question such as the one below might have let the patient name what was hardest before problem-solving began.\n\n## Overall impression\n\n- **Strengths**: The learner responded to emotion repeatedly and with genuine warmth, and several responses were well-chosen for the moment: naming the specific pain of knowing without answers, legitimizing the patient's embarrassment at coming alone, recognizing the patient's effort to understand, and backing commitments with concrete action rather than platitudes. The non-abandonment thread ran through the whole encounter. The learner also handled the early question about a disc skillfully, gathering a little more before warning and offering to involve the wife early.\n- **Priority gaps**: The two hardest emotional openings: the prognosis question and the dread about telling Marlene: were met with acknowledgment that then moved fairly quickly to information and planning. The content was right and the patient wanted it; what was thin was the pause to sit with the fear before solving.\n- **Top action items**\n  1. When a patient asks how long they have, treat it first as an emotional disclosure: acknowledge the fear in asking before explaining why you cannot yet answer.\n  2. When a patient names the real problem of not knowing what to tell their spouse, try one exploring question before shifting to the plan. Suggested wording: \"What worries you most about that conversation with her?\"\n  3. Keep doing the concrete, specific support commitments: they were a clear strength and they clearly landed.\n",
        "extractedData": {
          "nurse_naming_used": {
            "value": true,
            "reasoning": "Learner said: \"I know this is very hard news to, to hear\": when the patient went silent on hearing the diagnosis, you named how hard the news was, and later named the specific tension of knowing something is wrong without answers, which landed closer to what he was struggling with."
          },
          "nurse_exploring_used": {
            "value": false,
            "reasoning": "No moment in this encounter: the patient volunteered openings you met with warmth and reassurance, but the conversation did not require an exploring question; it was an option, not an obligation."
          },
          "nurse_naming_evidence": "I know this is very hard news to, to hear",
          "nurse_respecting_used": {
            "value": true,
            "reasoning": "Learner said: \"It sounds like you have a very good understanding of what's going on\": after the patient read the whole plan back, you acknowledged his grasp of a frightening amount of information, recognizing a real coping effort."
          },
          "nurse_supporting_used": {
            "value": true,
            "reasoning": "Learner said: \"I'm gonna give them a call directly ... get you in as soon as possible\": you made concrete commitments to organize appointments and call specialists directly, and closed with an explicit non-abandonment message, so the partnership felt real."
          },
          "nurse_exploring_evidence": null,
          "nurse_understanding_used": {
            "value": true,
            "reasoning": "Learner said: \"definitely don't feel that way ... this wasn't an outcome that we expected\": when the patient voiced embarrassment about coming alone, you legitimized the situation and reframed it so he was not at fault, meeting the self-blame directly."
          },
          "nurse_respecting_evidence": "It sounds like you have a very good understanding of what's going on",
          "nurse_supporting_evidence": "I'm gonna give them a call directly ... get you in as soon as possible",
          "nurse_understanding_evidence": "definitely don't feel that way ... this wasn't an outcome that we expected",
          "nurse_emotion_met_before_information": {
            "value": false,
            "reasoning": "Learner said: \"I can imagine that this is very difficult\": the two hardest openings, the prognosis question and the dread about telling Marlene, were met with brief acknowledgment that then moved fairly quickly to the plan; try one exploring question such as \"What worries you most about that conversation with her?\" (suggested wording) before shifting to logistics so the fear gets a beat first."
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
      "message": "That is definitely a legitimate concern. Um, is there a reason why you thought that it was a disc specifically?"
    },
    {
      "role": "agent",
      "message": "Just... lifting, I guess. I've been at the warehouse thirty years, something was bound to go eventually. Figured that was it."
    },
    {
      "role": "user",
      "message": "Yeah, that sounds hard. I know you do a lot of, a lot of physical labor."
    },
    {
      "role": "agent",
      "message": "..."
    },
    {
      "role": "user",
      "message": "What else?"
    },
    {
      "role": "agent",
      "message": "I mean, it ..."
    },
    {
      "role": "user",
      "message": "What I thought... Oh, I'm so sorry. Please. I cut you off."
    },
    {
      "role": "agent",
      "message": "No, you're alright. I was just going to say, it wakes me up most nights now. And I've dropped some weight, which I wasn't trying to do. Marlene noticed before I did."
    },
    {
      "role": "user",
      "message": "Yeah, it sounds like your wife is very, is very attentive. And that's, those are definitely the things that worried me and the reason that I got the scan."
    },
    {
      "role": "agent",
      "message": "Right. So did it show the disc, or...?"
    },
    {
      "role": "user",
      "message": "Yeah. So I actually have some difficult news. Uh, before I go into the details, I wanted to ask, uh, do you want to call your wife on the phone so that she can listen in while we're chatting, or would you like to talk to her later?"
    },
    {
      "role": "agent",
      "message": "[quiet] Difficult news. Um. She's at work. I didn't... I didn't think today was going to be that kind of appointment. Maybe later. Just tell me."
    },
    {
      "role": "user",
      "message": "Okay. Of course. So unfortunately, when we were reviewing the results of the scan, what we saw were some tumors in the spine that are concerning for cancer. We don't know where the original cancer is, but based on the imaging, it looks like they're, like they're, these are, this is cancer that has spread from somewhere."
    },
    {
      "role": "agent",
      "message": "[quiet] Cancer."
    },
    {
      "role": "user",
      "message": "Yeah, absolutely. I know this is very hard news to, to hear."
    },
    {
      "role": "agent",
      "message": "..."
    },
    {
      "role": "user",
      "message": "..."
    },
    {
      "role": "agent",
      "message": "[quiet] Cancer of what?"
    },
    {
      "role": "user",
      "message": "Yeah, that's a great question. So unfortunately, that's not information that I have right now. Um, we... I do have a plan in terms of next steps that we would take to try to get that information for you. Um, but before I go into those details, um, I know this is a lot of information. Do you need, do you need some time? Um, are you the kind of person that would like more details now, or, or do you need a little bit more time?"
    },
    {
      "role": "agent",
      "message": "[quiet] No, go on. Tell me the plan."
    },
    {
      "role": "user",
      "message": "Okay."
    },
    {
      "role": "agent",
      "message": "How do you find where it started?"
    },
    {
      "role": "user",
      "message": "Yeah. So the next steps would be for us to go ahead and get more imaging so that hopefully we could see kind of where the, the initial cancer is. Um, we would also send you to a cancer doctor, which is an oncologist, um, that'll, that'll help us with that process, as well as a spine specialist that's gonna help you with management of your pain and, and symptoms that you have from these tumors in your spine."
    },
    {
      "role": "agent",
      "message": "[quiet] How long does that take? Finding where it started."
    },
    {
      "role": "user",
      "message": "Yeah, that's a great question. It, it's, it's actually a little bit difficult for me to answer that. Um, what I can tell you is that we do, we do treat this with some urgency. So, I'm gonna get you in to get those scans as soon as possible. lip smack Um, and then I'm gonna send referrals to the oncologist and also to the spine specialist. Additionally, um, I'm gonna give them a call directly to let them know what the situation is so that they can expedite your appointment and get you in as soon as possible."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay."
    },
    {
      "role": "user",
      "message": "..."
    },
    {
      "role": "agent",
      "message": "And... how long have I got? I know that's the question nobody wants."
    },
    {
      "role": "user",
      "message": "No, of course. And I think one of the things that makes this so hard is that we know that there is something, you know, we, you, you do have cancer and that's something that's very scary, but we don't have all the answers yet. So unfortunately, I'm not able to answer that question as of now, um, but our plan is to get you in to see the right people so you're able to have those conversations as soon as possible."
    },
    {
      "role": "agent",
      "message": "[quiet] Alright. \n\nShould I have brought Marlene? I feel stupid now, coming on my own."
    },
    {
      "role": "user",
      "message": "No, of course. Uh, and definitely don't feel that way. I don't think that... You know, we were concerned by some of your symptoms, but this wasn't an outcome that we expected or, um, anything that we, you know, news that we wanted to give you."
    },
    {
      "role": "agent",
      "message": "[quiet] Yeah.\n\nCan I call her from here? Before I drive anywhere."
    },
    {
      "role": "user",
      "message": "Absolutely. Um, you know, l- l- we can call her together if that would be more comfortable for you. Um, if you'd like me to step out so you can talk to her first, we can do that as well. Whatever is easiest."
    },
    {
      "role": "agent",
      "message": "[quiet] Thanks. I'll call her first, on my own, and then maybe you can talk to her after. If that's alright."
    },
    {
      "role": "user",
      "message": "Absolutely. I can understand that this is very difficult news. Um, if there's anything that you wanna talk through before giving her a call, since I know this is gonna be a very difficult conversation, um, I'm happy to listen."
    },
    {
      "role": "agent",
      "message": "[quiet] I don't know what I'm telling her yet. That's the problem. She's going to ask cancer of what, same as I did, and I haven't got an answer."
    },
    {
      "role": "user",
      "message": "Yeah, of course. And, and I, and I can, I can imagine that this is very difficult."
    },
    {
      "role": "agent",
      "message": "[quiet] Yeah.\n\nWhat do I tell her I'm doing about it? Today, I mean. Right now."
    },
    {
      "role": "user",
      "message": "Yeah, of course. So, why don't we talk about the short-term plan then, like the things that we can do until you're able to get into those visits? Would that be helpful?"
    },
    {
      "role": "agent",
      "message": "[quiet] Yeah. Please."
    },
    {
      "role": "user",
      "message": "Okay. So, I know that you, you work a job which you, you have to lift some heavy things and it's a very physical job. So, I'm gonna give you a note to excuse you from work, um, until we're able to get a little more information."
    },
    {
      "role": "agent",
      "message": "[quiet] ..."
    },
    {
      "role": "user",
      "message": "Is that something you'd be comfortable with?"
    },
    {
      "role": "agent",
      "message": "[quiet] Okay. I'll have to tell my supervisor something. But okay.\n\nIs there stuff I shouldn't be doing? With the back, I mean. At home."
    },
    {
      "role": "user",
      "message": "Yeah, of course. So, um, we'll, we'll give you medication to help with the symptoms of the pain that you've been experiencing. Uh, and then I would, would suggest that you not do any heavy lifting until we have some more information. When you have, um, tumors in the spine, it makes the bone weak. Um, it's part of what's causing your pain, but it also means that it can get injured more easily."
    },
    {
      "role": "agent",
      "message": "[quiet] That's why it changed. The pain. That makes sense, actually. First thing today that has.\n\nWhat would mean I need to come back in straight away? Or go to the ER?"
    },
    {
      "role": "user",
      "message": "Yeah, that's a great question. So, definitely if you have, uh, a sudden worsening of your pain, I want you to go to the emergency room right away. Because that bone is weak, uh, my concern would be that there could be a break in the bone or, or something that needs to be managed more urgently."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay. Worsening pain, ER. Got it.\n\nWhat about my legs? Like if they went numb or something, is that the sort of thing?"
    },
    {
      "role": "user",
      "message": "Yes, of course. So any, any numbness or new tingling in your legs, um, if there's any new incontinence, so if you stool yourself or urinate yourself, um, tho- those would be concerning symptoms for me and a reason to go to the emergency room right away."
    },
    {
      "role": "agent",
      "message": "[quiet] Alright. Numbness, tingling, accidents. Straight to the ER."
    },
    {
      "role": "user",
      "message": "Yeah. Is there, is there anything else that you'd like to talk through that you feel would be helpful to, to clarify right now?"
    },
    {
      "role": "agent",
      "message": "[quiet] Let me just... say it back, make sure I've got it.\n\nThe scan showed cancer in the bones of my spine. You don't know yet where it started, and that's what the other scans and the oncologist are for. No lifting, pain meds, note for work. If the pain gets suddenly worse, or my legs go funny, or I have an accident, I go to the ER. That right?"
    },
    {
      "role": "user",
      "message": "Yes. It sounds like you have a very good understanding of what's going on."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay.\n\nWho calls me, and when? So I know what I'm waiting for."
    },
    {
      "role": "user",
      "message": "Yeah, of course. Um, so once we get finished with this visit, um, I'll do my part and I'll make sure... I'll, I'll organize all of those appointments for you."
    },
    {
      "role": "agent",
      "message": "[quiet] Okay."
    },
    {
      "role": "user",
      "message": "So our office will, will give you a call with all of that information, uh, by tomorrow. If you don't hear to us by tomorrow... hear from us by tomorrow afternoon, I want you guy- you to go ahead and give us a call back."
    },
    {
      "role": "agent",
      "message": "[quiet] Alright. Call by tomorrow afternoon, otherwise I ring you. Got it.\n\nThank you. I mean it. I'm going to go sit in the car and call Marlene."
    },
    {
      "role": "user",
      "message": "Sounds good. And I, uh, I'm very sorry that you had to hear this news today and that n- you're, you know, you'll have to t- talk to your wife on your own. But please feel free to give us a call back. Um, have her call me directly, and I'm happy to, to discuss everything that we talked about here as well."
    },
    {
      "role": "agent",
      "message": "Thank you. I'll have her call you. Appreciate it."
    }
  ],
  "audio": {
    "src": "/examples/disclosing-an-incidental-finding-of-metastatic-disease-with-no-known-primary/audio-efa995b5.mp3",
    "durationSeconds": 586
  }
};

export default example;
