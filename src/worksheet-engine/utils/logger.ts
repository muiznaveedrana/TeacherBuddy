/**
 * Logging utility for worksheet engine CLI
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export class Logger {
  private static prefix = '[Worksheet Engine]'

  static info(message: string, ...args: unknown[]): void {
    console.log(`${this.prefix} ${message}`, ...args)
  }

  static success(message: string, ...args: unknown[]): void {
    console.log(`${this.prefix} ✅ ${message}`, ...args)
  }

  static warn(message: string, ...args: unknown[]): void {
    console.warn(`${this.prefix} ⚠️  ${message}`, ...args)
  }

  static error(message: string, error?: unknown): void {
    console.error(`${this.prefix} ❌ ${message}`)
    if (error && process.env.NODE_ENV === 'development') {
      console.error(error)
    }
  }

  static step(step: number, total: number, message: string): void {
    console.log(`${this.prefix} [${step}/${total}] ${message}`)
  }

  static separator(): void {
    console.log('')
  }
}