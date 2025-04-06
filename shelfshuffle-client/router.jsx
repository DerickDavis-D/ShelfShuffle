import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

// Add future flags
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true, // Opt-in for React.startTransition
    v7_relativeSplatPath: true, // Opt-in for relative splat path resolution
 

  },
});



export default router