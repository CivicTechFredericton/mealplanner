import { Box, Button, Container, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { usePreloadedQuery, useQueryLoader } from "react-relay";
import { graphql } from "relay-runtime";
import { Component, useEffect, Suspense } from "react";
import type { ReactNode } from "react";
import { LandingPageQuery } from "./__generated__/LandingPageQuery.graphql";

const query = graphql`
  query LandingPageQuery {
    currentPerson {
      fullName
    }
    gqLocalState {
      currentUser {
        personID
      }
    }
  }
`;

// ─── Marketing content — no Relay dependency, always safe to render ───────────
const LandingPageContent = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: `linear-gradient(rgba(33, 33, 33, 0.7), rgba(106, 166, 74, 0.6)), url('/images/veggie-background-log-in.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", zIndex: 1 }}>
          <Typography
            variant="overline"
            sx={{
              display: "block",
              letterSpacing: 4,
              mb: 2,
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.9rem",
              animation: "fadeInUp 1s ease-out",
              "@keyframes fadeInUp": {
                "0%": { opacity: 0, transform: "translateY(30px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            A Greener Village Initiative
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 3,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              animation: "fadeInUp 1s ease-out",
            }}
          >
            Plan Healthy, Eat Better
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 5,
              fontWeight: 300,
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              animation: "fadeInUp 1s ease-out 0.3s backwards",
            }}
          >
            Greener Village's Meal Planner empowers you to discover nutritious
            recipes, plan your week with ease, and eat well — no matter your
            budget.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              animation: "fadeInUp 1s ease-out 0.6s backwards",
            }}
          >
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                px: 5,
                py: 1.5,
                fontSize: "1.2rem",
                borderRadius: "30px",
                boxShadow: "0 8px 16px rgba(106, 166, 74, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 20px rgba(106, 166, 74, 0.6)",
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: "#f9f6f0" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{ fontWeight: 700, mb: 2, color: "#2e2e2e" }}
          >
            Everything You Need to Eat Well
          </Typography>
          <Typography
            align="center"
            sx={{ color: "#666", mb: 8, maxWidth: 600, mx: "auto" }}
          >
            Greener Village's Meal Planner brings together smart tools and
            community-driven recipes to make healthy eating simple, affordable,
            and enjoyable for every household.
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            {[
              {
                emoji: "🥗",
                title: "Personalized Meal Plans",
                description:
                  'Build weekly meal plans tailored to your household size, dietary needs, and taste preferences. Never wonder "what\'s for dinner?" again.',
              },
              {
                emoji: "🛒",
                title: "Smart Grocery Lists",
                description:
                  "Automatically generate consolidated shopping lists from your meal plan. Shop smarter, reduce waste, and stay on budget.",
              },
              {
                emoji: "📖",
                title: "Recipe Discovery",
                description:
                  "Browse a growing library of nutritious, budget-friendly recipes curated with community members in mind — from quick weeknight meals to weekend feasts.",
              },
              {
                emoji: "💰",
                title: "Budget-Friendly Eating",
                description:
                  "Designed for real families and real budgets. Find meals that stretch every dollar without sacrificing nutrition or flavour.",
              },
              {
                emoji: "🌱",
                title: "Nutrition at a Glance",
                description:
                  "Understand what's in your meals with clear nutritional information so you can make informed choices for yourself and your family.",
              },
              {
                emoji: "🔄",
                title: "Flexible & Adjustable",
                description:
                  "Swap recipes, adjust serving sizes, and reschedule meals on the fly. Your plan works around your life — not the other way around.",
              },
            ].map((feature) => (
              <Box
                key={feature.title}
                sx={{
                  bgcolor: "white",
                  borderRadius: 3,
                  p: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 32px rgba(106,166,74,0.15)",
                  },
                }}
              >
                <Typography sx={{ fontSize: "2.5rem", mb: 1.5 }}>
                  {feature.emoji}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1, color: "#2e2e2e" }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ color: "#666", lineHeight: 1.7 }}>
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, bgcolor: "#fff" }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{ fontWeight: 700, mb: 2, color: "#2e2e2e" }}
          >
            How It Works
          </Typography>
          <Typography
            align="center"
            sx={{ color: "#666", mb: 8, maxWidth: 540, mx: "auto" }}
          >
            Getting started is simple. You'll be planning your first week of
            healthy meals in minutes.
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
              gap: 3,
              textAlign: "center",
            }}
          >
            {[
              { step: "1", label: "Create your account", icon: "👤" },
              { step: "2", label: "Browse & save recipes", icon: "🔍" },
              { step: "3", label: "Build your weekly plan", icon: "📅" },
              { step: "4", label: "Shop with your list", icon: "✅" },
            ].map((item) => (
              <Box key={item.step}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    fontSize: "1.6rem",
                    boxShadow: "0 4px 12px rgba(106,166,74,0.35)",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="overline"
                  sx={{ color: "primary.main", fontWeight: 700 }}
                >
                  Step {item.step}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#2e2e2e", mt: 0.5 }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Banner */}
      <Box
        sx={{
          py: 10,
          backgroundImage: "linear-gradient(135deg, #3a7d44 0%, #6aa64a 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            Ready to Start Eating Better?
          </Typography>
          <Typography sx={{ mb: 5, opacity: 0.9, fontSize: "1.1rem" }}>
            Join the Greener Village community and take the guesswork out of
            meal planning — for free.
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "primary.dark",
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: "30px",
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#f0f0f0",
                transform: "translateY(-3px)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
              },
            }}
          >
            Get Started — It's Free
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          bgcolor: "#1e1e1e",
          color: "rgba(255,255,255,0.5)",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Greener Village. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

// ─── Error Boundary — catches Relay throws when backend is down ───────────────
class LandingErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <LandingPageContent />;
    }
    return this.props.children;
  }
}

// ─── Relay-aware inner component — handles auth redirect ─────────────────────
const LandingPageInner = ({ queryRef }: { queryRef: any }) => {
  const data = usePreloadedQuery<LandingPageQuery>(query, queryRef);

  if (data.gqLocalState.currentUser?.personID) {
    return <Navigate to="/mealplans" replace />;
  }

  return <LandingPageContent />;
};

// ─── Exported component ───────────────────────────────────────────────────────
export const LandingPage = () => {
  const [queryRef, loadQuery] = useQueryLoader<LandingPageQuery>(query);

  useEffect(() => {
    loadQuery({}, { fetchPolicy: "network-only" });
  }, [loadQuery]);

  // Show marketing page immediately while query loads (no blank flash)
  if (!queryRef) {
    return <LandingPageContent />;
  }

  return (
    <LandingErrorBoundary>
      <Suspense fallback={<LandingPageContent />}>
        <LandingPageInner queryRef={queryRef} />
      </Suspense>
    </LandingErrorBoundary>
  );
};
