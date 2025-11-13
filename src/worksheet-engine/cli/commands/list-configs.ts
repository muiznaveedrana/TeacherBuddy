/**
 * List configurations command implementation for worksheet engine CLI
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { listAvailableConfigs, getConfigDetails } from '../utils/config-parser'

export function listConfigs(): void {
  console.log('\nAvailable Printable Configurations:\n')
  
  const configs = listAvailableConfigs()
  
  configs.forEach(configId => {
    const details = getConfigDetails(configId)
    if (details) {
      console.log(`${configId}`)
      console.log(`  Year Group:     ${details.yearGroup}`)
      console.log(`  Topic:          ${details.topic}`)
      console.log(`  Subtopic:       ${details.subtopic}`)
      console.log(`  Difficulty:     ${details.difficulty}`)
      console.log(`  Question Count: ${details.questionCount}`)
      console.log(`  Layout:         ${details.layout}`)
      console.log('')
    }
  })
  
  console.log(`Total configurations: ${configs.length}`)
  console.log('\nUsage:')
  console.log('  worksheet-engine --config="<config-id>" --output-dir="./results/test-001"')
  console.log('')
}