'use client'

import { CreditCard, AlertCircle, RefreshCw, Settings, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface PaymentErrorProps {
  errorType?: 'card_declined' | 'insufficient_funds' | 'expired_card' | 'processing_error' | 'subscription_failed' | 'generic'
  onRetry?: () => void
  onUpdatePayment?: () => void
  onContactSupport?: () => void
  amount?: string
}

export function PaymentError({
  errorType = 'generic',
  onRetry,
  onUpdatePayment,
  onContactSupport,
  amount
}: PaymentErrorProps) {
  const getErrorContent = () => {
    switch (errorType) {
      case 'card_declined':
        return {
          title: "Payment Declined",
          message: "Your payment was declined by your bank or card issuer.",
          suggestions: [
            "Check that your card details are correct",
            "Ensure you have sufficient funds available", 
            "Contact your bank if the issue persists",
            "Try a different payment method"
          ],
          showRetry: true,
          showUpdatePayment: true
        }
      case 'insufficient_funds':
        return {
          title: "Insufficient Funds",
          message: `Your payment of ${amount || '£2.99'} could not be processed due to insufficient funds.`,
          suggestions: [
            "Add funds to your account",
            "Use a different payment method",
            "Check your account balance",
            "Contact your bank for assistance"
          ],
          showRetry: true,
          showUpdatePayment: true
        }
      case 'expired_card':
        return {
          title: "Card Expired",
          message: "The payment card on file has expired and needs to be updated.",
          suggestions: [
            "Update your payment method",
            "Enter your new card details",
            "Remove the expired card from your account"
          ],
          showRetry: false,
          showUpdatePayment: true
        }
      case 'processing_error':
        return {
          title: "Processing Error",
          message: "There was a technical issue processing your payment. This is usually temporary.",
          suggestions: [
            "Try your payment again in a few minutes",
            "Check your internet connection",
            "Contact support if the problem continues"
          ],
          showRetry: true,
          showUpdatePayment: false
        }
      case 'subscription_failed':
        return {
          title: "Subscription Update Failed",
          message: "We couldn't update your subscription. Your current plan remains active.",
          suggestions: [
            "Try updating your subscription again",
            "Check your payment method is valid",
            "Contact support for assistance"
          ],
          showRetry: true,
          showUpdatePayment: true
        }
      default:
        return {
          title: "Payment Error",
          message: "There was an issue processing your payment. Please try again.",
          suggestions: [
            "Verify your payment details are correct",
            "Try a different payment method",
            "Contact support if problems persist"
          ],
          showRetry: true,
          showUpdatePayment: true
        }
    }
  }

  const { title, message, suggestions, showRetry, showUpdatePayment } = getErrorContent()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-red-600" />
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {message}
          </AlertDescription>
        </Alert>
        
        {amount && (
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <p className="font-medium">Transaction Amount: {amount}</p>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600">
          <p className="font-medium">What you can do:</p>
          <ul className="space-y-1 ml-4 text-xs">
            {suggestions.map((suggestion, index) => (
              <li key={index}>• {suggestion}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          {showUpdatePayment && onUpdatePayment && (
            <Button 
              onClick={onUpdatePayment} 
              className="w-full"
              variant="default"
            >
              <Settings className="w-4 h-4 mr-2" />
              Update Payment Method
            </Button>
          )}
          
          {showRetry && onRetry && (
            <Button 
              onClick={onRetry}
              variant="outline" 
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Payment Again
            </Button>
          )}
          
          <Button 
            onClick={onContactSupport}
            variant="ghost" 
            className="w-full text-sm"
          >
            <Phone className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}