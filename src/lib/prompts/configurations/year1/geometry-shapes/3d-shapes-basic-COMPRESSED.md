# Ages 5-6: 3D Shapes - Basic

Generate EXACTLY {{questionCount}} Year 1 3D shapes questions.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Shapes:** Cube, Sphere, Cone, Cylinder ONLY
**Questions:** EXACTLY {{questionCount}} - count before returning
**Age-Appropriate:** Simple language, visual-heavy, real-world objects
**Skills:** Name shapes, identify in real life, count faces/edges/corners

## 5-QUESTION FORMAT (VARY EACH WORKSHEET!)

**Q1:** Name the 3D shape (show 1 shape) - RANDOMIZE: shape + color
**Q2:** Find real-world objects (match shape to objects) - RANDOMIZE: shape + objects
**Q3:** Count faces/edges (show 1 shape) - RANDOMIZE: shape (cube/cylinder only)
**Q4:** Match shapes to names (4 shapes) - RANDOMIZE: shuffle word order
**Q5:** Circle the correct shape (description given) - RANDOMIZE: clue + distractors

## SHAPES - Use image placeholders or CSS

**Cube:** Box/dice-like shape
**Sphere:** Ball/circle in 3D
**Cone:** Ice cream cone/party hat
**Cylinder:** Can/tube shape

## REAL-WORLD OBJECTS

**Cube:** dice, box, present, building block
**Sphere:** ball, orange, globe, bubble
**Cone:** ice cream cone, party hat, traffic cone
**Cylinder:** can, drum, pencil, toilet roll

## Q1 - Name the 3D Shape (RANDOMIZE!)
**RANDOMIZE**: Pick ONE shape + ONE color + ONE question variation

**Shapes**: Cube, Sphere, Cone, Cylinder

**Question Variations** (pick ONE):
- "What 3D shape is this?"
- "Name this 3D shape."
- "What is this shape called?"
- "Circle the correct name."

**Answer Format**: Multiple choice with 3-4 options

## Q2 - Find Real-World Objects (RANDOMIZE!)
**RANDOMIZE**: Pick ONE shape + show 4 real objects (2 match, 2 don't)

**For Each Shape:**
- **Cube**: dice, box (MATCH) + ball, can (DON'T MATCH)
- **Sphere**: ball, orange (MATCH) + cone, can (DON'T MATCH)
- **Cone**: ice cream cone, party hat (MATCH) + box, ball (DON'T MATCH)
- **Cylinder**: can, drum (MATCH) + box, ball (DON'T MATCH)

**Question Variations** (pick ONE):
- "Circle the objects that are [shape]s."
- "Which objects are shaped like a [shape]?"
- "Find the [shape] shapes."
- "Tick the [shape]s."

## Q3 - Count Faces/Edges (RANDOMIZE!)
**RANDOMIZE**: Pick cube OR cylinder + count faces OR edges

**Cube:**
- Faces: 6
- Edges: 12
- Corners: 8

**Cylinder:**
- Faces: 3 (2 circles + 1 curved surface)
- Edges: 2 (circular edges)
- NO corners

**Sphere:** No flat faces, edges, or corners (skip for this question)
**Cone:** 2 faces, 1 edge, 1 corner (can use if advanced)

**Question Variations** (pick ONE):
- "How many faces does this [shape] have?"
- "Count the faces."
- "How many edges can you see?"
- "Count the edges on this shape."

## Q4 - Match Shapes to Names (RANDOMIZE!)
**RANDOMIZE**: Show all 4 shapes + shuffle word order

**Shapes**: Cube, Sphere, Cone, Cylinder (all 4, always)

**Question Variations** (pick ONE):
- "Draw lines to match the 3D shapes to their names."
- "Match each shape with its name."
- "Connect the shapes to the correct words."
- "Join the shapes to their names."

**CRITICAL**: Always shuffle the word column order (don't align them!)

## Q5 - Circle the Correct Shape (RANDOMIZE!)
**RANDOMIZE**: Give ONE clue about a shape + show 3-4 shapes

**Clue Examples:**
- "I have no corners. Circle me." (Sphere)
- "I have 6 square faces. Circle me." (Cube)
- "I look like an ice cream cone. Circle me." (Cone)
- "I look like a can. Circle me." (Cylinder)
- "I can roll in any direction. Circle me." (Sphere)
- "I have a point at the top. Circle me." (Cone)

## EXAMPLE OUTPUT

**Q1 (Name the Shape):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What 3D shape is this?</p>
    <div class="shape-container">
        <div class="shape-3d cube">
            <div class="cube-face front"></div>
            <div class="cube-face back"></div>
            <div class="cube-face right"></div>
            <div class="cube-face left"></div>
            <div class="cube-face top"></div>
            <div class="cube-face bottom"></div>
        </div>
    </div>
    <div class="multiple-choice">
        <div class="choice-option">
            <input type="radio" name="q1" id="q1a">
            <label for="q1a">Sphere</label>
        </div>
        <div class="choice-option">
            <input type="radio" name="q1" id="q1b">
            <label for="q1b">Cube</label>
        </div>
        <div class="choice-option">
            <input type="radio" name="q1" id="q1c">
            <label for="q1c">Cone</label>
        </div>
    </div>
</div>
```

**Q2 (Find Real Objects):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Circle the objects that are spheres.</p>
    <div class="object-grid">
        <div class="object-item">
            <div class="object-img sphere-visual">Ball</div>
            <p class="object-label">Ball</p>
        </div>
        <div class="object-item">
            <div class="object-img cube-visual">Box</div>
            <p class="object-label">Box</p>
        </div>
        <div class="object-item">
            <div class="object-img sphere-visual">Orange</div>
            <p class="object-label">Orange</p>
        </div>
        <div class="object-item">
            <div class="object-img cylinder-visual">Can</div>
            <p class="object-label">Can</p>
        </div>
    </div>
</div>
```

**Q3 (Count Faces):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> How many faces does this cube have?</p>
    <div class="shape-container">
        <div class="shape-3d cube large">
            <div class="cube-face front">Front</div>
            <div class="cube-face back">Back</div>
            <div class="cube-face right">Right</div>
            <div class="cube-face left">Left</div>
            <div class="cube-face top">Top</div>
            <div class="cube-face bottom">Bottom</div>
        </div>
    </div>
    <p class="answer-prompt">This cube has <span class="answer-box"></span> faces.</p>
</div>
```

**Q4 (Match Shapes):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Draw lines to match the shapes to their names.</p>
    <div class="matching-activity">
        <div class="matching-column">
            <div class="match-item shape-item">
                <div class="shape-3d sphere small"></div>
            </div>
            <div class="match-item shape-item">
                <div class="shape-3d cube small"></div>
            </div>
            <div class="match-item shape-item">
                <div class="shape-3d cone small"></div>
            </div>
            <div class="match-item shape-item">
                <div class="shape-3d cylinder small"></div>
            </div>
        </div>
        <div class="matching-column">
            <div class="match-item word">Cylinder</div>
            <div class="match-item word">Sphere</div>
            <div class="match-item word">Cube</div>
            <div class="match-item word">Cone</div>
        </div>
    </div>
</div>
```

**Q5 (Circle Correct Shape):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> I have no corners. Circle me.</p>
    <div class="shape-options">
        <div class="shape-choice">
            <div class="shape-3d cube"></div>
            <p>Cube</p>
        </div>
        <div class="shape-choice">
            <div class="shape-3d sphere"></div>
            <p>Sphere</p>
        </div>
        <div class="shape-choice">
            <div class="shape-3d cone"></div>
            <p>Cone</p>
        </div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Cube</p>
        <p><strong>2.</strong> Ball and Orange (spheres)</p>
        <p><strong>3.</strong> 6 faces</p>
        <p><strong>4.</strong> Sphere-Sphere, Cube-Cube, Cone-Cone, Cylinder-Cylinder</p>
        <p><strong>5.</strong> Sphere (no corners)</p>
    </div>
</div>
```

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:10px;border-radius:8px;}
.shape-container{display:flex;justify-content:center;margin:20px 0;}
.shape-3d{position:relative;margin:20px;}
.shape-3d.sphere{width:100px;height:100px;background:radial-gradient(circle at 30% 30%,#87CEEB,#4682B4);border-radius:50%;}
.shape-3d.cube{width:80px;height:80px;position:relative;transform-style:preserve-3d;transform:rotateX(-20deg) rotateY(30deg);}
.cube-face{position:absolute;width:80px;height:80px;background:rgba(70,130,180,0.8);border:2px solid #2C5F8D;display:flex;align-items:center;justify-content:center;font-size:10pt;font-weight:bold;color:white;}
.cube-face.front{transform:translateZ(40px);}
.cube-face.back{transform:translateZ(-40px) rotateY(180deg);}
.cube-face.right{transform:rotateY(90deg) translateZ(40px);}
.cube-face.left{transform:rotateY(-90deg) translateZ(40px);}
.cube-face.top{transform:rotateX(90deg) translateZ(40px);background:rgba(135,206,235,0.9);}
.cube-face.bottom{transform:rotateX(-90deg) translateZ(40px);}
.shape-3d.cone{width:0;height:0;border-left:50px solid transparent;border-right:50px solid transparent;border-bottom:100px solid #FF8C00;position:relative;}
.shape-3d.cone::after{content:'';position:absolute;width:100px;height:30px;background:radial-gradient(ellipse,#FFA500,#FF8C00);border-radius:50%;bottom:-15px;left:-50px;}
.shape-3d.cylinder{width:80px;height:100px;background:linear-gradient(90deg,#32CD32,#228B22,#32CD32);border-radius:5px;position:relative;}
.shape-3d.cylinder::before{content:'';position:absolute;width:80px;height:20px;background:radial-gradient(ellipse,#90EE90,#32CD32);border-radius:50%;top:-10px;left:0;}
.shape-3d.cylinder::after{content:'';position:absolute;width:80px;height:20px;background:radial-gradient(ellipse,#228B22,#006400);border-radius:50%;bottom:-10px;left:0;}
.shape-3d.small{transform:scale(0.5);}
.shape-3d.large{transform:scale(1.2);}
.object-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:15px auto;max-width:600px;}
.object-item{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;}
.object-img{width:80px;height:80px;margin:0 auto 10px;display:flex;align-items:center;justify-content:center;font-weight:bold;border-radius:8px;}
.object-img.sphere-visual{background:radial-gradient(circle at 30% 30%,#FFB6C1,#FF69B4);border-radius:50%;}
.object-img.cube-visual{background:linear-gradient(135deg,#DEB887,#8B7355);border:2px solid #654321;}
.object-img.cone-visual{background:linear-gradient(180deg,#FFE4B5,#FFA500);clip-path:polygon(50% 0%,0% 100%,100% 100%);}
.object-img.cylinder-visual{background:linear-gradient(90deg,#C0C0C0,#808080,#C0C0C0);border-radius:5px;}
.shape-options{display:flex;justify-content:space-around;margin:20px auto;max-width:500px;}
.shape-choice{text-align:center;padding:15px;border:3px solid #333;border-radius:10px;}
.multiple-choice{margin:15px 0;}
.choice-option{margin:8px 0;padding:8px;border:2px solid #ddd;border-radius:5px;}
.choice-option label{margin-left:10px;font-size:14pt;}
.matching-activity{display:grid;grid-template-columns:1fr 1fr;gap:30px;max-width:400px;margin:15px auto;}
.matching-column{display:flex;flex-direction:column;gap:15px;}
.match-item{padding:12px;border:2px solid #333;border-radius:8px;text-align:center;font-weight:bold;font-size:14pt;min-height:80px;display:flex;align-items:center;justify-content:center;}
.match-item.shape-item{background:#F0F0F0;}
.match-item.word{background:#FFF9C4;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-box{display:inline-block;border-bottom:2px solid #333;min-width:80px;height:30px;vertical-align:middle;}
.answer-line{display:inline-block;border-bottom:2px solid #333;min-width:200px;height:30px;vertical-align:middle;}
.answer-key{margin-top:40px;padding:20px;background:#f5f5f5;border:2px solid #333;border-radius:8px;}
.answer-key-title{font-size:18pt;margin-bottom:10px;}
.answer-key-content p{margin:5px 0;}
</style>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.
