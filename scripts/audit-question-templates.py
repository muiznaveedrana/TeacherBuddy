"""
Question Template Audit Script
Analyzes master-vision-catalog.json and identifies:
1. Collections with poor/non-curriculum-aligned question templates
2. Decorative-only collections
3. Collections needing template updates

Based on UK National Curriculum standards for Reception through Year 6
"""

import json
import re
from typing import List, Dict, Set

# UK National Curriculum-Aligned Question Templates
# Based on standards from Reception (ages 4-5) through Year 6 (ages 10-11)

CURRICULUM_ALIGNED_TEMPLATES = {
    # COUNTING (Reception - Year 2)
    "counting": [
        "Count the {objects}. How many are there?",
        "How many {objects} can you see?",
        "Circle the group with {number} {objects}.",
    ],
    
    # ADDITION (Reception - Year 6)
    "addition": [
        "{Name} has {num1} {objects}. {Name2} gives {pronoun} {num2} more. How many {objects} does {Name} have now?",
        "There are {num1} {objects} and {num2} more {objects}. How many {objects} in total?",
        "{Name} found {num1} {objects} in the garden. Then {pronoun} found {num2} more. How many {objects} did {pronoun} find altogether?",
    ],
    
    # SUBTRACTION (Reception - Year 6)
    "subtraction": [
        "{Name} had {num1} {objects}. {Pronoun} gave away {num2}. How many {objects} does {Name} have left?",
        "There were {num1} {objects}. {num2} flew away. How many {objects} are left?",
        "{Name} bought {num1} {objects}. {Pronoun} ate {num2}. How many {objects} remain?",
    ],
    
    # MULTIPLICATION (Year 2 - Year 6)
    "multiplication": [
        "Each {container} has {num1} {objects}. There are {num2} {containers}. How many {objects} in total?",
        "{Name} has {num1} groups of {num2} {objects}. How many {objects} altogether?",
        "If there are {num1} {objects} in each box and {num2} boxes, how many {objects} are there?",
    ],
    
    # DIVISION (Year 3 - Year 6)
    "division": [
        "{Name} has {num1} {objects} to share equally between {num2} friends. How many {objects} does each friend get?",
        "There are {num1} {objects} in {num2} equal groups. How many {objects} in each group?",
        "If {num1} {objects} are divided equally into {num2} bags, how many in each bag?",
    ],
    
    # FRACTIONS (Year 1 - Year 6)
    "fractions": [
        "What fraction of the {objects} are {color}?",
        "{Name} ate {fraction} of {num1} {objects}. How many {objects} did {pronoun} eat?",
        "Circle {fraction} of the {objects}.",
    ],
}

# Keywords that indicate DECORATIVE-ONLY collections
DECORATIVE_KEYWORDS = [
    "border", "divider", "frame", "decoration", "background", 
    "clipart", "embellishment", "ornament"
]

# Keywords that indicate NON-CURRICULUM language (inappropriate for children)
INAPPROPRIATE_KEYWORDS = [
    "write your answer in",
    "draw in the frame",
    "use this border",
    "decorative element",
    "copy this pattern",
]

def load_catalog(filepath: str) -> Dict:
    """Load the master vision catalog"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def is_decorative_collection(collection: Dict) -> bool:
    """Determine if a collection is purely decorative"""
    name = collection.get('name', '').lower()
    topics = ' '.join(collection.get('curriculumTopics', [])).lower()
    categories = ' '.join(collection.get('thematicCategories', [])).lower()
    
    # Check if collection name contains decorative keywords
    for keyword in DECORATIVE_KEYWORDS:
        if keyword in name or keyword in categories:
            return True
    
    # Check if topics include "decorative"
    if 'decorative' in topics or 'decoration' in topics:
        return True
    
    return False

def has_inappropriate_templates(templates: List[str]) -> bool:
    """Check if templates contain inappropriate language"""
    templates_text = ' '.join(templates).lower()
    
    for keyword in INAPPROPRIATE_KEYWORDS:
        if keyword in templates_text:
            return True
    
    return False

def get_object_name(collection: Dict) -> str:
    """Extract the primary countable object from collection"""
    primary_objects = collection.get('primaryObjects', [])
    if primary_objects:
        # Return first object that's not a background/scene element
        for obj in primary_objects:
            obj_lower = obj.lower()
            if obj_lower not in ['background', 'scene', 'border', 'frame', 'decoration']:
                return obj
    
    # Fallback to collection name
    name = collection.get('name', '').replace('_', ' ').replace('by', '').replace('ScrappinDoodles', '').strip()
    return name.split()[0] if name else "objects"

def generate_curriculum_aligned_templates(collection: Dict) -> List[str]:
    """Generate age-appropriate, curriculum-aligned question templates"""
    topics = collection.get('curriculumTopics', [])
    age_groups = collection.get('ageGroups', [])
    object_name = get_object_name(collection)
    
    templates = []
    
    # Always include counting (universal for all ages)
    if 'counting' in ' '.join(topics).lower() or any('Year' in ag or 'Reception' in ag for ag in age_groups):
        templates.append(f"Count the {object_name}. How many are there?")
        templates.append(f"How many {object_name} can you see?")
    
    # Addition
    if 'addition' in ' '.join(topics).lower():
        templates.append(f"There are {{num1}} {object_name} and {{num2}} more {object_name}. How many {object_name} in total?")
        templates.append(f"{{Name}} has {{num1}} {object_name}. {{Name2}} gives {{num1}} more. How many {object_name} does {{Name}} have now?")
    
    # Subtraction
    if 'subtraction' in ' '.join(topics).lower():
        templates.append(f"{{Name}} had {{num1}} {object_name}. {{Pronoun}} gave away {{num2}}. How many {object_name} are left?")
        templates.append(f"There were {{num1}} {object_name}. {{num2}} were eaten. How many {object_name} remain?")
    
    # Multiplication (Year 2+)
    if 'multiplication' in ' '.join(topics).lower():
        templates.append(f"Each box has {{num1}} {object_name}. There are {{num2}} boxes. How many {object_name} in total?")
    
    # Division (Year 3+)
    if 'division' in ' '.join(topics).lower():
        templates.append(f"Share {{num1}} {object_name} equally between {{num2}} friends. How many does each friend get?")
    
    # Fractions (Year 2+)
    if 'fraction' in ' '.join(topics).lower():
        templates.append(f"What fraction of the {object_name} are {{color}}?")
    
    # If no specific templates generated, use default counting
    if not templates:
        templates.append(f"Count the {object_name}. How many are there?")
    
    return templates[:3]  # Return max 3 templates

def audit_catalog(catalog: Dict) -> Dict:
    """Audit all collections and generate report"""
    report = {
        'total_collections': len(catalog),
        'decorative_only': [],
        'inappropriate_templates': [],
        'empty_templates': [],
        'needs_update': [],
        'good_templates': []
    }
    
    for collection_name, collection_data in catalog.items():
        templates = collection_data.get('questionTemplates', [])
        
        # Check if decorative
        if is_decorative_collection(collection_data):
            report['decorative_only'].append({
                'name': collection_name,
                'reason': 'Contains decorative keywords (border/frame/divider)',
                'current_templates': templates
            })
            continue
        
        # Check if empty
        if not templates:
            report['empty_templates'].append({
                'name': collection_name,
                'suggested': generate_curriculum_aligned_templates(collection_data)
            })
            continue
        
        # Check if inappropriate
        if has_inappropriate_templates(templates):
            report['inappropriate_templates'].append({
                'name': collection_name,
                'current': templates,
                'suggested': generate_curriculum_aligned_templates(collection_data)
            })
            continue
        
        # Check quality of templates
        templates_text = ' '.join(templates).lower()
        if any(keyword in templates_text for keyword in ['how many', 'count', 'add', 'subtract', 'total', 'left', 'altogether']):
            report['good_templates'].append(collection_name)
        else:
            report['needs_update'].append({
                'name': collection_name,
                'current': templates,
                'suggested': generate_curriculum_aligned_templates(collection_data)
            })
    
    return report

def print_report(report: Dict):
    """Print audit report"""
    print("\n" + "="*80)
    print("QUESTION TEMPLATE AUDIT REPORT")
    print("="*80)
    
    print(f"\nSUMMARY:")
    print(f"   Total Collections: {report['total_collections']}")
    print(f"   Good Templates: {len(report['good_templates'])}")
    print(f"   Decorative Only: {len(report['decorative_only'])}")
    print(f"   Inappropriate Templates: {len(report['inappropriate_templates'])}")
    print(f"   Empty Templates: {len(report['empty_templates'])}")
    print(f"   Needs Update: {len(report['needs_update'])}")
    
    print(f"\n\nDECORATIVE-ONLY COLLECTIONS ({len(report['decorative_only'])}):")
    print("   These should be marked as DECORATIVE-EXCLUDE")
    for item in report['decorative_only'][:10]:
        print(f"   - {item['name']}")
    if len(report['decorative_only']) > 10:
        print(f"   ... and {len(report['decorative_only']) - 10} more")
    
    print(f"\n\nINAPPROPRIATE TEMPLATES ({len(report['inappropriate_templates'])}):")
    print("   These use non-child-friendly language")
    for item in report['inappropriate_templates'][:5]:
        print(f"\n   Collection: {item['name']}")
        print(f"   CURRENT: {item['current']}")
        print(f"   SUGGESTED: {item['suggested']}")
    
    print(f"\n\nEMPTY TEMPLATES ({len(report['empty_templates'])}):")
    for item in report['empty_templates'][:5]:
        print(f"\n   Collection: {item['name']}")
        print(f"   SUGGESTED: {item['suggested']}")
    
    print(f"\n\nNEEDS QUALITY UPDATE ({len(report['needs_update'])}):")
    for item in report['needs_update'][:5]:
        print(f"\n   Collection: {item['name']}")
        print(f"   Current: {item['current']}")
        print(f"   SUGGESTED: {item['suggested']}")

def main():
    catalog_path = 'catalogs/master-vision-catalog.json'
    
    print("Loading catalog...")
    catalog = load_catalog(catalog_path)
    
    print("Auditing question templates...")
    report = audit_catalog(catalog)
    
    print_report(report)
    
    # Save detailed report to file
    output_path = 'catalogs/question-template-audit-report.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n\n✅ Detailed report saved to: {output_path}")
    print("\nNext steps:")
    print("1. Review decorative-only collections and mark them")
    print("2. Update inappropriate templates with curriculum-aligned versions")
    print("3. Fill empty templates with age-appropriate questions")

if __name__ == "__main__":
    main()
