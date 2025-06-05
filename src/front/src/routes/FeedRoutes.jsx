import React from "react";
import { Route } from "react-router-dom";
import Feed from "../pages/Feed";

const FeedRoutes = () => (
  <>
    <Route path="/feed" element={<Feed />} />
  </>
);

export default FeedRoutes;
