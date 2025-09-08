/**
 * Simple test script for CLI functionality
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

const { spawn } = require('child_process')
const path = require('path')

async function testCli() {
  console.log('Testing Worksheet Engine CLI...\n')
  
  const cliPath = path.join(__dirname, '..', 'src', 'worksheet-engine', 'cli', 'index.ts')
  
  // Test help command
  console.log('Testing --help command:')
  try {
    const helpProcess = spawn('npx', ['tsx', cliPath, '--help'], { 
      stdio: 'inherit',
      shell: true 
    })
    
    await new Promise((resolve, reject) => {
      helpProcess.on('close', (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`Help command failed with code ${code}`))
        }
      })
    })
    
    console.log('\n✅ Help command test passed\n')
  } catch (error) {
    console.error('❌ Help command test failed:', error.message)
  }
  
  // Test list-configs command
  console.log('Testing --list-configs command:')
  try {
    const listProcess = spawn('npx', ['tsx', cliPath, '--list-configs'], { 
      stdio: 'inherit',
      shell: true 
    })
    
    await new Promise((resolve, reject) => {
      listProcess.on('close', (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`List configs command failed with code ${code}`))
        }
      })
    })
    
    console.log('\n✅ List configs command test passed\n')
  } catch (error) {
    console.error('❌ List configs command test failed:', error.message)
  }
}

if (require.main === module) {
  testCli().catch(console.error)
}