import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(
  req: Request,
) {
  // Caution: this must be text! Not json!
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.log(error.message)
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const userId = session?.metadata?.userId
  const courseId = session?.metadata?.courseId

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      console.log("Missing webhook metadata!!!")
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400
      })
    }

    await db.purchase.create({
      data: {
        courseId: courseId,
        userId: userId,
      }
    })
  } else {
    return new NextResponse(`Webhook Error: unhandled event type ${event.type}`, { status: 200 })
  }

  return new NextResponse(null, { status: 200 })
}