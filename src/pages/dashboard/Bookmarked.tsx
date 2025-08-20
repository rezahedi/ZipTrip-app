import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeBookmark, getBookmarks } from "@/util/dashboard";
import PlanCard from "@/Components/Common/PlanCard";
import PlanCardSkeleton from "@/Components/Common/PlanCardSkeleton";
import AlertDialog from "@/Components/Common/AlertDialog";
import Pagination from "@/Components/Common/Pagination";
import { Button } from "@/Components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getQueryValue } from "@/util/url";
import { Plan } from "@/types";

const PAGE_SIZE = 9;

function Bookmarked() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [selectedPlanToRemove, setSelectedPlanToRemove] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token } = useAuth();
  const navigate = useNavigate();
  let page = getQueryValue(location.search, "page") || "1";
  const [pagesCount, setPagesCount] = useState<number>(0);

  useEffect(() => {
    page = getQueryValue(location.search, "page") || "1";
  }, [location.search]);

  useEffect(() => {
    // FIXME: Instead of just redirecting user to home, show a not authorized message with login button or redirect to login page
    if (!token) {
      navigate("/");
      return;
    }

    (async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      params.set("page", page);
      params.set("size", PAGE_SIZE.toString());
      const paramsString = params.toString();

      const data = await getBookmarks(paramsString, token, setError);
      if (!data) return setIsLoading(false);

      setPlans(data.items || []);
      setPagesCount(data.pagesCount || 0);
      setIsLoading(false);
    })();
  }, [page]);

  const handleRemovePlan = async () => {
    if (!token) return;

    const result = await removeBookmark(token, selectedPlanToRemove, setError);

    if (!result) return;

    // Filter out the removed plan from the state
    setPlans(plans.filter((plan) => plan._id !== selectedPlanToRemove));
    setSelectedPlanToRemove("");
    setAlertOpen(false);
  };

  const openDeleteDialog = (planId: string) => {
    setSelectedPlanToRemove(planId);
    setAlertOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  if (!isLoading && !plans.length)
    return (
      <div className="text-center mt-1">
        <p className="font-semibold text-lg">Nothing bookmarked yet.</p>
      </div>
    );

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xl font-semibold">Bookmarked Plans</h4>
      </div>

      {!isLoading && error && <p>{error}</p>}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <PlanCardSkeleton key={index} />
          ))}
        {!isLoading &&
          plans.map((plan) => {
            return (
              <div key={plan._id}>
                <PlanCard
                  {...plan}
                  image={plan.images[0]}
                  isBookmarked={true}
                  showBookmarkBtn={false}
                />
                <Button
                  variant="destructive"
                  onClick={() => openDeleteDialog(plan._id)}
                  className="ml-0.5 mt-0.5"
                >
                  Remove
                </Button>
              </div>
            );
          })}
      </div>
      <Pagination page={Number(page)} pagesCount={pagesCount} />
      <AlertDialog
        isOpen={alertOpen}
        onClose={handleClose}
        title="Removing Bookmarked Plan"
        message="Are you sure you want to remove this plan?"
        onConfirm={handleRemovePlan}
        confirmText="Remove"
        cancelText="Cancel"
      />
    </>
  );
}

export default Bookmarked;
