
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import "@testing-library/jest-dom";
import { getOrders, postOrder } from "../../apiCalls";
jest.mock("../../apiCalls")
//mock data


describe("App", () => {
    let orderDetails
    beforeEach(() => {
        orderDetails = {
            orders: [
                {
                    name: "mike",
                    ingredients: ["cheese", "chicken"]
                },
                {
                    name: "not mike",
                    ingredients: ["beans", "tomatoes"]
                }
            ]
        };
        getOrders.mockResolvedValueOnce(orderDetails)
    })

    it("should render the app", () => {
        render(
            <App />
        )
        expect(screen.getByText("Burrito Builder")).toBeInTheDocument();
    })

    it("should render the a form on app rendering", () => {
        render(
            <App />
        )
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit order/i })).toBeInTheDocument();
    })

    it("show current orders", async () => {
        render(
            <App />
        )
        const order1 = await waitFor(() => screen.getByText("mike"))
        const order2 = await waitFor(() => screen.getByText("not mike"))
        expect(order1).toBeInTheDocument();
        expect(order2).toBeInTheDocument();
    })

    it("should add a new order", async () => {
        render(
            <App />
        )
        
        postOrder.mockResolvedValueOnce(orderDetails)

        const button = await waitFor(() => screen.getByRole('button', { name: /submit order/i }))
        const name = screen.getByPlaceholderText("Name");
        const ingredient = screen.getByRole('button', { name: /beans/i });

        userEvent.type(name, "Mike");
        userEvent.click(ingredient);
        userEvent.click(button);

        const updatedOrder = await waitFor(() => screen.getByText("Mike"))
        expect(updatedOrder).toBeInTheDocument();
    })

})
