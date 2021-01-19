import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderForm from "./OrderForm";
import "@testing-library/jest-dom";


describe("OrderForm", () => {
    it("should render a form", () => {
        render(
            <OrderForm data={jest.fn()}/>
        )
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    })

    it("should render ingredient buttons", () => {
        render(
            <OrderForm data={jest.fn()}/>
        )
        expect(screen.getByText("beans")).toBeInTheDocument();
        expect(screen.getByText("steak")).toBeInTheDocument();
        expect(screen.getByText("queso fresco")).toBeInTheDocument();
        expect(screen.getByText("sour cream")).toBeInTheDocument();
        expect(screen.getByText("jalapenos")).toBeInTheDocument();
    })

    it("should be able to type a name in input field", () => {
        render(
            <OrderForm data={jest.fn()}/>
        )
        const input = screen.getByPlaceholderText("Name");
        userEvent.type(input, "Mike")
  
        expect(input.value).toBe("Mike")
    })

    it("should be able to make a reservation", async () => {
        const mockReservation = jest.fn()
        render(
            <OrderForm data={mockReservation}/>
        )
        const button = await waitFor(() => screen.getByRole('button', { name: /submit order/i }))
        const name = screen.getByPlaceholderText("Name");
        const ingredient = screen.getByRole('button', { name: /beans/i });

        userEvent.type(name, "Mike");
        userEvent.click(ingredient);
        userEvent.click(button);
        expect(mockReservation).toHaveBeenCalled();;
    })
})