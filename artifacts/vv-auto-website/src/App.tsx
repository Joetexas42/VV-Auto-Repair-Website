import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/LanguageContext";

import Homepage from "@/pages/index";
import Services from "@/pages/services";
import BrakeRepair from "@/pages/services/brake-repair";
import OilChange from "@/pages/services/oil-change";
import EngineRepair from "@/pages/services/engine-repair";
import StateInspection from "@/pages/services/state-inspection";
import Diagnostics from "@/pages/services/diagnostics";
import CollisionRepair from "@/pages/services/collision-body-repair";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Gallery from "@/pages/gallery";
import Reviews from "@/pages/reviews";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Homepage} />
      <Route path="/services" component={Services} />
      <Route path="/services/brake-repair" component={BrakeRepair} />
      <Route path="/services/oil-change" component={OilChange} />
      <Route path="/services/engine-repair" component={EngineRepair} />
      <Route path="/services/state-inspection" component={StateInspection} />
      <Route path="/services/diagnostics" component={Diagnostics} />
      <Route path="/services/collision-body-repair" component={CollisionRepair} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/reviews" component={Reviews} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
