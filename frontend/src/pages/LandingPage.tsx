import React from 'react'
import { Link } from 'react-router'
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BookmarkCheck,
  Clock3,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: 'Fast personalized feed',
    description: 'Get fresh headlines quickly and refine what you see by category and search intent.',
    icon: Zap,
  },
  {
    title: 'Read and save sync',
    description: 'Track your saved and read lists with one account so your reading flow stays organized.',
    icon: BookmarkCheck,
  },
  {
    title: 'AI article summaries',
    description: 'Generate structured takeaways with topic suggestions before spending time on full reads.',
    icon: Bot,
  },
]

const stats = [
  { label: 'Top headlines per load', value: '25' },
  { label: 'Protected routes for users', value: '100%' },
  { label: 'One-click AI summaries', value: '< 3s' },
]

function LandingPage() {
  return (
    <div
      className='min-h-screen bg-background text-foreground'
      style={{ fontFamily: '"Manrope", "Segoe UI", sans-serif' }}
    >
      <div className='relative overflow-hidden'>
        <div className='pointer-events-none absolute inset-0 opacity-60'>
          <div className='landing-orb landing-orb-a absolute -top-32 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl' />
          <div className='landing-orb landing-orb-b absolute top-10 right-10 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl' />
          <div className='landing-orb landing-orb-c absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl' />
        </div>

        <div className='relative mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10'>
          <header className='landing-enter landing-delay-1 mb-14 flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur md:px-6'>
            <Link to='/' className='flex items-center gap-2'>
              <div className='rounded-md bg-primary/15 p-2'>
                <Newspaper className='h-4 w-4 text-primary' />
              </div>
              <span className='text-sm font-semibold tracking-wide'>ARTICLEHUB</span>
            </Link>
            <div className='flex items-center gap-2'>
              <Link to='/auth/sign-in'>
                <Button variant='ghost' size='sm'>Sign in</Button>
              </Link>
              <Link to='/auth/sign-up'>
                <Button size='sm'>Start free</Button>
              </Link>
            </div>
          </header>

          <section className='grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]'>
            <div className='space-y-6'>
              <Badge variant='outline' className='landing-enter landing-delay-2 gap-1 border-primary/40 bg-primary/10 px-3 py-1'>
                <Sparkles className='h-3 w-3 text-primary' />
                AI-powered personal newsroom
              </Badge>

              <h1
                className='landing-enter landing-delay-3 text-balance text-4xl font-bold leading-tight md:text-6xl'
                style={{ fontFamily: '"Fraunces", "Iowan Old Style", "Times New Roman", serif' }}
              >
                News intelligence that feels like a premium SaaS product.
              </h1>

              <p className='landing-enter landing-delay-4 max-w-2xl text-lg text-muted-foreground'>
                Read fewer low-signal articles. Save what matters, mark what you finished, and generate clean AI summaries when you need context fast.
              </p>

              <div className='landing-enter landing-delay-5 flex flex-wrap items-center gap-3 pt-2'>
                <Link to='/app/news'>
                  <Button size='lg' className='gap-2'>
                    Open newsroom
                    <ArrowRight className='h-4 w-4' />
                  </Button>
                </Link>
                <Link to='/auth/sign-up'>
                  <Button variant='outline' size='lg'>Create account</Button>
                </Link>
              </div>

              <div className='grid gap-3 pt-2 sm:grid-cols-3'>
                {stats.map((item, index) => (
                  <div
                    key={item.label}
                    className='landing-enter landing-interactive rounded-xl border border-border/80 bg-background/80 px-4 py-3'
                    style={{ animationDelay: `${420 + index * 90}ms` }}
                  >
                    <p className='text-xl font-semibold'>{item.value}</p>
                    <p className='text-xs text-muted-foreground'>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className='landing-enter landing-delay-4 landing-float border-border/80 bg-background/80 shadow-xl'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center justify-between text-base'>
                  Live workspace preview
                  <Badge variant='secondary' className='text-[10px]'>BETA</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='rounded-lg border border-border bg-muted/30 p-3'>
                  <p className='mb-1 text-xs text-muted-foreground'>Current feed status</p>
                  <div className='flex items-center justify-between text-sm'>
                    <span>Top headlines synced</span>
                    <span className='font-semibold text-emerald-600'>25 loaded</span>
                  </div>
                </div>
                <div className='rounded-lg border border-border bg-muted/30 p-3'>
                  <p className='mb-1 text-xs text-muted-foreground'>Saved articles</p>
                  <div className='flex items-center justify-between text-sm'>
                    <span>Reading queue</span>
                    <span className='font-semibold'>Always available</span>
                  </div>
                </div>
                <div className='rounded-lg border border-border bg-muted/30 p-3'>
                  <p className='mb-1 text-xs text-muted-foreground'>AI summarizer</p>
                  <div className='flex items-center justify-between text-sm'>
                    <span>Gemini structured output</span>
                    <span className='font-semibold text-primary'>Active</span>
                  </div>
                </div>
                <Link to='/app/news' className='block pt-2'>
                  <Button variant='secondary' className='w-full gap-2'>
                    Explore product
                    <ArrowRight className='h-4 w-4' />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          <section className='mt-16 grid gap-4 md:grid-cols-3'>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className='landing-enter landing-interactive border-border/70 bg-background/75'
                  style={{ animationDelay: `${560 + index * 120}ms` }}
                >
                  <CardHeader className='space-y-3 pb-0'>
                    <div className='w-fit rounded-lg border border-border p-2'>
                      <Icon className='h-4 w-4 text-primary' />
                    </div>
                    <CardTitle className='text-lg'>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground'>{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </section>

          <section className='landing-enter landing-delay-6 mt-10 rounded-2xl border border-border/70 bg-muted/20 p-6 md:p-8'>
            <div className='grid gap-6 md:grid-cols-3'>
              <div className='landing-interactive space-y-2'>
                <ShieldCheck className='h-5 w-5 text-primary' />
                <h3 className='text-lg font-semibold'>Secure session flow</h3>
                <p className='text-sm text-muted-foreground'>Access tokens and refresh cookies keep protected pages smooth without interrupting reading.</p>
              </div>
              <div className='landing-interactive space-y-2'>
                <Clock3 className='h-5 w-5 text-primary' />
                <h3 className='text-lg font-semibold'>Fast, focused reading</h3>
                <p className='text-sm text-muted-foreground'>Jump from feed to full content and get key takeaways quickly with less cognitive load.</p>
              </div>
              <div className='landing-interactive space-y-2'>
                <BadgeCheck className='h-5 w-5 text-primary' />
                <h3 className='text-lg font-semibold'>Built for daily use</h3>
                <p className='text-sm text-muted-foreground'>A clean UX that is designed to feel reliable enough for everyday decision making.</p>
              </div>
            </div>
          </section>

          <footer className='landing-enter landing-delay-7 mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/70 pt-6 text-sm text-muted-foreground md:flex-row md:items-center'>
            <p>ArticleHub - News and AI summary workspace</p>
            <div className='flex items-center gap-3'>
              <Link to='/auth/sign-in' className='hover:text-foreground'>Sign in</Link>
              <span>/</span>
              <Link to='/auth/sign-up' className='hover:text-foreground'>Create account</Link>
              <span>/</span>
              <Link to='/app/news' className='hover:text-foreground'>Open app</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
