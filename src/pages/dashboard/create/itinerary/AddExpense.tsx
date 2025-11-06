import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { TicketMinusIcon } from "lucide-react";

const usDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const AddExpense = ({
  expense,
  onSave,
}: {
  expense: number;
  onSave: (expense: number) => void;
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleEditExpense = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsEditMode(true);
  };

  const handleSave = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newExpense: number = e.target.valueAsNumber;
    setIsEditMode(false);
    onSave(newExpense);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter" || e.key === "Tab") {
      const newExpense: number = e.currentTarget.valueAsNumber;
      setIsEditMode(false);
      onSave(newExpense);
    } else if (e.key === "Escape") {
      setIsEditMode(false);
    }
  };

  if (isEditMode)
    return (
      <Button size="sm" variant="link" className="text-xs border-1 rounded-md">
        <TicketMinusIcon className="size-4 stroke-1" />{" "}
        <input
          type="number"
          defaultValue={expense || ""}
          autoFocus
          onBlur={handleSave}
          onKeyDown={handleEnter}
          className="outline-none p-1 min-w-10 field-sizing-content text-right"
        />
      </Button>
    );

  return (
    <Button
      size="sm"
      variant="link"
      className="text-xs"
      title={expense ? "Click to edit expense" : "Click to add expense"}
      onClick={handleEditExpense}
    >
      <TicketMinusIcon className="size-4 stroke-1" />{" "}
      {expense ? usDollarFormatter.format(expense) : "Add Expense"}
    </Button>
  );
};

export default AddExpense;
