import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import TheBusStory from "./pages/TheBusStory";
import MyCosmeticSurgery from "./pages/MyCosmeticSurgery";
import NuroxCaseStudy from "./pages/NuroxCaseStudy";
import TheBusCaseStudy from "./pages/TheBusCaseStudy";
import LexiconloreCaseStudy from "./pages/LexiconloreCaseStudy";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/the-bus-story" component={TheBusStory} />
      <Route path="/case-study/my-cosmetic-surgery" component={MyCosmeticSurgery} />
      <Route path="/case-study/nurox" component={NuroxCaseStudy} />
      <Route path="/case-study/the-bus" component={TheBusCaseStudy} />
      <Route path="/case-study/lexiconlore" component={LexiconloreCaseStudy} />
      {/* Catch-all route for 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
