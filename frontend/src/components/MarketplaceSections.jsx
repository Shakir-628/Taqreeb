import React, { useMemo, useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, Chip, Divider,
  LinearProgress, Stack, TextField, Typography, Skeleton,
} from '@mui/material';
import {
  Speed, EventAvailable, Payments, Message, VerifiedUser,
} from '@mui/icons-material';
import { MapPin, ArrowRight } from 'lucide-react';
import { api } from '../api';
import { useSearch } from '../context/SearchContext';

// ── Shared heading component ──────────────────────────────────────────────────
function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <Box sx={{ maxWidth: 640, mb: 5 }}>
      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: light ? 'var(--clr-gold)' : 'var(--clr-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1 }}>
        {eyebrow}
      </Typography>
      <Typography variant="h3" sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, letterSpacing: '-0.02em', color: light ? 'white' : 'var(--clr-text)', mb: 1.5 }}>
        {title}
      </Typography>
      {text && (
        <Typography sx={{ color: light ? 'rgba(255,255,255,0.7)' : 'var(--clr-muted)', lineHeight: 1.7 }}>
          {text}
        </Typography>
      )}
    </Box>
  );
}

// ── Why TAQREEB ───────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  { icon: <Speed />, title: 'Save time and effort', text: 'Compare trusted event professionals from one calm, focused search — no more calling 20+ venues.' },
  { icon: <EventAvailable />, title: 'Availability first', text: 'See who can make your date work before you start calling around.' },
  { icon: <Payments />, title: 'Clear price estimates', text: 'Build a realistic plan around your budget in Pakistani rupees.' },
  { icon: <Message />, title: 'Book easily on WhatsApp', text: 'Move from shortlist to conversation with one simple tap.' },
];

export function WhyTaqreeb() {
  return (
    <Box component="section" sx={{ py: { xs: 5, md: 7 }, backgroundColor: 'var(--clr-bg-dark)', color: 'white' }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2.5 }}>
          {WHY_ITEMS.map((item) => (
            <Box key={item.title} sx={{ p: 2.5, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--r-lg)', transition: 'border-color 0.2s', '&:hover': { borderColor: 'rgba(201,155,75,0.4)' } }}>
              <Box sx={{ color: 'var(--clr-gold)', mb: 2 }}>{item.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>{item.title}</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{item.text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ── Venue & Clothing showcase ─────────────────────────────────────────────────
const VENUE_TYPES = [
  { name: 'Banquet Hall',    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=75' },
  { name: 'Marquee',         img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=75' },
  { name: 'Lawn / Garden',   img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=75' },
  { name: 'Indoor Hall',     img: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=75' },
  { name: 'Farmhouse',       img: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=600&q=75' },
  { name: 'Hotel Ballroom',  img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=75' },
  { name: 'Restaurant Venue', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75' },
  { name: 'Corporate Venue', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=75' },
];

const CLOTHING_TYPES = [
  { name: 'Bridal Wear',          img: 'https://images.unsplash.com/photo-1536681689-c5a3a7ac4f8f?w=600&q=75' },
  { name: 'Groom Sherwani',       img: 'https://images.unsplash.com/photo-1578926288207-a90a5366a2de?w=600&q=75' },
  { name: 'Formal & Party Wear',  img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=75' },
  { name: 'Mehndi & Barat Outfits', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=75' },
  { name: 'Kids & Family Wear',   img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=75' },
  { name: 'Jewellery & Accessories', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=75' },
  { name: 'Designer Boutiques',   img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { name: 'Outfit Rentals',       img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=75' },
];

function ShowcaseSection({ id, bg, eyebrow, title, subtitle, items, categoryKey }) {
  const { updateFilter } = useSearch();

  const handleClick = (name) => {
    updateFilter('category', categoryKey);
    setTimeout(() => document.getElementById('vendors')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  return (
    <Box component="section" id={id} sx={{ py: { xs: 7, md: 11 }, backgroundColor: bg }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <SectionHeading eyebrow={eyebrow} title={title} text={subtitle} />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
          {items.map((item, i) => (
            <Box
              key={item.name}
              onClick={() => handleClick(item.name)}
              sx={{
                borderRadius: 'var(--r-xl)', overflow: 'hidden',
                aspectRatio: i < 2 ? '4/3' : '1/1',
                position: 'relative', cursor: 'pointer',
                gridColumn: i < 2 ? 'span 1' : undefined,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 'var(--sh-xl)' },
                '&:hover .showcase-overlay': { opacity: 0.55 },
                '&:hover .showcase-arrow': { transform: 'translate(3px, -3px)' },
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <Box
                className="showcase-overlay"
                sx={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(43,32,48,0.75) 0%, rgba(43,32,48,0.2) 60%, transparent 100%)',
                  opacity: 0.7, transition: 'opacity 0.25s',
                }}
              />
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, color: 'white', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: 1.3 }}>
                  {item.name}
                </Typography>
                <ArrowRight className="showcase-arrow" size={18} style={{ flexShrink: 0, transition: 'transform 0.22s', opacity: 0.85 }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function VenueAndClothing() {
  return (
    <>
      <ShowcaseSection
        id="venuetypes"
        bg="var(--clr-bg)"
        eyebrow="Venue collection"
        title="Find your perfect venue"
        subtitle="From an intimate garden dinner to a ballroom for 800 guests, find a venue that feels like your occasion."
        items={VENUE_TYPES}
        categoryKey="Venue"
      />
      <ShowcaseSection
        id="clothingtypes"
        bg="white"
        eyebrow="Complete your look"
        title="Dress the moment beautifully"
        subtitle="Discover bridal, groom, family and formalwear specialists for every kind of celebration."
        items={CLOTHING_TYPES}
        categoryKey="Clothing"
      />
    </>
  );
}

// ── Deals & Packages ──────────────────────────────────────────────────────────
const STATIC_DEALS = [
  { eyebrow: 'WEEKDAY SPECIAL', title: 'Celebrate more, spend less', detail: 'Save up to 15% on selected venues Monday to Thursday.', price: 'From PKR 150,000', color: 'var(--clr-primary)' },
  { eyebrow: 'BUNDLE & SAVE', title: 'Venue + decor together', detail: 'A polished setup with one point of contact and one clear quote.', price: 'Save up to 20%', color: 'var(--clr-gold)' },
  { eyebrow: 'BEST VALUE', title: 'Small celebrations, sorted', detail: 'Thoughtful packages for birthdays, aqeeqahs and intimate dinners.', price: 'From PKR 35,000', color: 'var(--clr-success)' },
];

const PACKAGES = [
  { title: 'Kids Birthday',    desc: 'Venue · Decoration · Cake · Photography', price: 'PKR 45,000',  emoji: '🎂' },
  { title: 'Office Gathering', desc: 'Venue · Catering · Sound · Event support', price: 'PKR 85,000',  emoji: '🏢' },
  { title: 'Aqeeqah',          desc: 'Venue · Catering · Floral styling · Invites', price: 'PKR 120,000', emoji: '👶' },
  { title: 'Walima Banquet',   desc: 'Banquet · Photography · Decoration · Makeup', price: 'PKR 350,000', emoji: '💍' },
];

export function DealsAndPackages() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/deals')
      .then((res) => {
        const data = res.data?.data || res.data;
        setDeals(Array.isArray(data) && data.length ? data.slice(0, 3) : []);
      })
      .catch(() => setDeals([]))
      .finally(() => setLoading(false));
  }, []);

  const displayDeals = deals.length ? deals.map((v, i) => ({
    eyebrow: v.deal?.toUpperCase() || STATIC_DEALS[i]?.eyebrow,
    title: v.name,
    detail: v.description || STATIC_DEALS[i]?.detail,
    price: `From PKR ${v.price?.toLocaleString()}`,
    color: STATIC_DEALS[i]?.color || 'var(--clr-primary)',
  })) : STATIC_DEALS;

  return (
    <>
      {/* Deals */}
      <Box component="section" id="deals" sx={{ py: { xs: 7, md: 11 }, backgroundColor: 'var(--clr-bg)' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 } }}>
          <SectionHeading eyebrow="Curated for you" title="Deals & offers" text="Good planning should feel rewarding. Start with a useful offer, then make it yours." />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Box key={i} sx={{ borderRadius: 'var(--r-lg)', border: '1px solid var(--clr-border)', p: 3 }}>
                    <Skeleton width="50%" height={16} sx={{ mb: 1 }} />
                    <Skeleton width="80%" height={28} sx={{ mb: 1 }} />
                    <Skeleton width="90%" height={16} sx={{ mb: 0.5 }} />
                    <Skeleton width="60%" height={16} />
                  </Box>
                ))
              : displayDeals.map((deal) => (
                  <Box
                    key={deal.title}
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: 'var(--r-lg)',
                      border: '1px solid var(--clr-border)',
                      borderTop: `4px solid ${deal.color}`,
                      p: 3,
                      boxShadow: 'var(--sh-sm)',
                      transition: 'box-shadow 0.22s, transform 0.22s',
                      '&:hover': { boxShadow: 'var(--sh-md)', transform: 'translateY(-3px)' },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: deal.color, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1.25 }}>
                      {deal.eyebrow}
                    </Typography>
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5, lineHeight: 1.3 }}>{deal.title}</Typography>
                    <Typography color="text.secondary" sx={{ minHeight: 48, lineHeight: 1.7, fontSize: '0.9rem' }}>{deal.detail}</Typography>
                    <Divider sx={{ my: 2.5 }} />
                    <Typography fontWeight={800} sx={{ color: deal.color, fontSize: '1rem' }}>{deal.price}</Typography>
                  </Box>
                ))}
          </Box>
        </Box>
      </Box>

      {/* Packages */}
      <Box component="section" sx={{ py: { xs: 7, md: 11 }, backgroundColor: 'white' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 } }}>
          <SectionHeading eyebrow="Ready-made starting points" title="Popular event packages" text="Use a bundle as your first draft, then adjust it to fit your people and your day." />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2.5 }}>
            {PACKAGES.map((pkg) => (
              <Box
                key={pkg.title}
                sx={{
                  borderRadius: 'var(--r-lg)', border: '1px solid var(--clr-border)',
                  p: 3, backgroundColor: 'white',
                  transition: 'all 0.22s', cursor: 'default',
                  '&:hover': { borderColor: 'var(--clr-primary)', boxShadow: 'var(--sh-md)', transform: 'translateY(-3px)' },
                }}
              >
                <Typography sx={{ fontSize: '2.4rem', mb: 2, lineHeight: 1 }}>{pkg.emoji}</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.25, lineHeight: 1.3 }}>{pkg.title}</Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.7, mb: 3 }}>{pkg.desc}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                  <Typography fontWeight={800} color="primary.main">{pkg.price}</Typography>
                  <Button variant="outlined" size="small" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, fontSize: '0.78rem' }}>
                    Build package
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

// ── Budget Planner ────────────────────────────────────────────────────────────
const BUDGET_BREAKDOWN = [
  ['Venue', 0.30], ['Catering', 0.22], ['Clothing', 0.12], ['Decoration', 0.11],
  ['Photography', 0.07], ['Entertainment', 0.05], ['Makeup', 0.04], ['Planning', 0.02],
  ['Rentals', 0.03], ['Invitations', 0.02], ['Cakes', 0.01], ['Transport', 0.01],
];

export function PlannerAndTrust() {
  const [rawBudget, setRawBudget] = useState('2000000');
  const [submittedBudget, setSubmittedBudget] = useState(2000000);
  const { updateFilter } = useSearch();

  const total = Number(submittedBudget) || 0;
  const formatted = useMemo(() => new Intl.NumberFormat('en-PK').format(total), [total]);

  const handleBrowse = (category) => {
    updateFilter('category', category);
    setTimeout(() => document.getElementById('vendors')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  return (
    <>
      {/* Budget Planner */}
      <Box component="section" id="planner" sx={{ py: { xs: 7, md: 11 }, backgroundColor: 'var(--clr-bg-dark)', color: 'white' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Stack spacing={3} sx={{ textAlign: 'center' }}>
            <Chip label="SMART EVENT PLANNER" sx={{ alignSelf: 'center', color: 'var(--clr-gold-lt)', borderColor: 'rgba(245,219,162,0.4)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em' }} variant="outlined" />
            <Typography variant="h3" sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Make the budget feel less overwhelming.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 540, mx: 'auto' }}>
              Enter a total and get a grounded first-pass breakdown across every key category.
            </Typography>

            {/* Input */}
            <Box sx={{ display: 'flex', gap: 1.5, maxWidth: 460, width: '100%', mx: 'auto' }}>
              <TextField
                type="number"
                fullWidth
                value={rawBudget}
                onChange={(e) => setRawBudget(e.target.value)}
                label="Total budget (PKR)"
                size="small"
                slotProps={{ htmlInput: { min: 0, step: 10000 } }}
                sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <Button
                variant="contained"
                onClick={() => setSubmittedBudget(Number(rawBudget))}
                sx={{ whiteSpace: 'nowrap', borderRadius: '8px', fontWeight: 700, px: 2.5, backgroundColor: 'var(--clr-gold)', color: 'var(--clr-text)', '&:hover': { backgroundColor: '#b8893d' } }}
              >
                Plan it
              </Button>
            </Box>

            {/* Total display */}
            <Typography variant="h4" sx={{ color: 'var(--clr-gold-lt)', fontWeight: 800, letterSpacing: '-0.01em' }}>
              PKR {formatted}
            </Typography>

            {/* Breakdown grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, textAlign: 'left' }}>
              {BUDGET_BREAKDOWN.map(([label, ratio]) => (
                <Box
                  key={label}
                  onClick={() => handleBrowse(label)}
                  sx={{
                    p: 2, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--r-md)',
                    cursor: 'pointer', transition: 'border-color 0.2s',
                    '&:hover': { borderColor: 'rgba(201,155,75,0.5)', backgroundColor: 'rgba(255,255,255,0.04)' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{label}</Typography>
                    <Typography variant="body2" sx={{ color: 'var(--clr-gold-lt)', fontWeight: 700 }}>
                      PKR {new Intl.NumberFormat('en-PK').format(Math.round(total * ratio))}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={ratio * 100 * 3.3}
                    sx={{ height: 4, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { backgroundColor: 'var(--clr-gold)', borderRadius: 4 } }}
                  />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', mt: 0.5, display: 'block' }}>{Math.round(ratio * 100)}% · Click to browse</Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Trust bar */}
      <Box component="section" sx={{ py: 3.5, backgroundColor: 'var(--clr-gold)' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {[
              ['No hidden fees', 'Know what you are paying for.'],
              ['Instant confirmation', 'Move quickly when the date matters.'],
              ['Flexible planning', 'Ask about rescheduling and cancellation.'],
            ].map(([title, text]) => (
              <Box key={title} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <VerifiedUser sx={{ color: 'var(--clr-text)', fontSize: 28, flexShrink: 0 }} />
                <Box>
                  <Typography fontWeight={700} sx={{ color: 'var(--clr-text)' }}>{title}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(43,32,48,0.75)' }}>{text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

// ── Availability calendar ─────────────────────────────────────────────────────
export function Availability() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getColor = (d) => {
    if (d % 9 === 0) return { bg: '#f5e4a0', color: '#7a5c10', label: 'Pending' };
    if (d % 13 === 0) return { bg: '#fad4d4', color: '#8b2020', label: 'Booked' };
    return { bg: '#d4f0e5', color: '#1a6644', label: 'Available' };
  };

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 11 }, backgroundColor: 'var(--clr-bg)' }}>
      <Box sx={{ maxWidth: 700, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <SectionHeading eyebrow="Plan with confidence" title="Vendor availability" text="A simple snapshot for your shortlist. Confirm exact dates directly with the vendor." />
        <Box sx={{ backgroundColor: 'white', borderRadius: 'var(--r-xl)', border: '1px solid var(--clr-border)', boxShadow: 'var(--sh-md)', p: { xs: 2.5, md: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1.5 }}>
            <Typography variant="h6" fontWeight={700}>September 2026</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[{ label: 'Available', bg: '#d4f0e5', color: '#1a6644' }, { label: 'Pending', bg: '#f5e4a0', color: '#7a5c10' }, { label: 'Booked', bg: '#fad4d4', color: '#8b2020' }].map((s) => (
                <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: s.bg, border: `1px solid ${s.color}20` }} />
                  <Typography variant="caption" sx={{ color: s.color, fontWeight: 600 }}>{s.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: { xs: 0.5, md: 1 }, mb: 1 }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <Typography key={i} variant="caption" align="center" sx={{ fontWeight: 700, color: 'var(--clr-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', pb: 0.5 }}>
                {d}
              </Typography>
            ))}
            {days.map((d) => {
              const s = getColor(d);
              return (
                <Box
                  key={d}
                  sx={{
                    aspectRatio: '1', display: 'grid', placeItems: 'center',
                    borderRadius: '8px', backgroundColor: s.bg,
                    color: s.color, fontWeight: 700, fontSize: { xs: '0.78rem', md: '0.85rem' },
                    cursor: 'pointer', transition: 'transform 0.15s, opacity 0.15s',
                    '&:hover': { transform: 'scale(1.12)', opacity: 0.85 },
                  }}
                >
                  {d}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
