/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.bodeloboalface;

import java.util.ArrayList;
import java.util.List;

class State {

    int wolf;
    int goat;
    int cabbage;
    int boat;  // 0 for left bank, 1 for right bank

    State(int wolf, int goat, int cabbage, int boat) {
        this.wolf = wolf;
        this.goat = goat;
        this.cabbage = cabbage;
        this.boat = boat;
    }

    boolean isValid() {
        if ((wolf == goat && goat != boat) || (goat == cabbage && goat != boat)) return false;
        return true;
    }

    boolean isGoal() {
        return wolf == 0 && goat == 0 && cabbage == 0 && boat == 0;
    }
    
}

public class BodeLoboAlface {

    public static void main(String[] args) {
        List<State> path = new ArrayList<>();
        if (solve(new State(1, 1, 1, 1), path)) {
            for (State state : path) {
                System.out.println(state.wolf + " " + state.goat + " " + state.cabbage + " " + state.boat);
            }
        } else {
            System.out.println("No solution found.");
        }
    }

    static boolean  solve(State currentState, List<State> path) {
      if (!currentState.isValid()) return false;

        path.add(currentState);

        if (currentState.isGoal()) return true;

        // Try moving items from left to right bank
        if (currentState.boat == 0) {
            State newState = new State(currentState.wolf - 1, currentState.goat, currentState.cabbage, 1);
            if (solve(newState, path)) return true;

            newState = new State(currentState.wolf, currentState.goat - 1, currentState.cabbage, 1);
            if (solve(newState, path)) return true;

            newState = new State(currentState.wolf, currentState.goat, currentState.cabbage - 1, 1);
            if (solve(newState, path)) return true;

            newState = new State(currentState.wolf - 1, currentState.goat - 1, currentState.cabbage, 1);
            if (solve(newState, path)) return true;

            newState = new State(currentState.wolf, currentState.goat - 1, currentState.cabbage - 1, 1);
            if (solve(newState, path)) return true;
        }

        // Try moving items from right to left bank
        if (currentState.boat == 1) {
            State newState = new State(currentState.wolf + 1, currentState.goat, currentState.cabbage, 0);
            if (solve(newState, path)) return true;

            newState = new State(currentState.wolf, currentState.goat + 1, currentState.cabbage, 0);
            if (solve(newState, path)) return true;

            newState = new State(currentState.wolf, currentState.goat, currentState.cabbage + 1, 0);
            if (solve(newState, path)) return true;

            newState = new State(currentState.wolf + 1, currentState.goat + 1, currentState.cabbage, 0);
            if (solve(newState, path)) return true;

            newState = new State(currentState.wolf, currentState.goat + 1, currentState.cabbage + 1, 0);
            if (solve(newState, path)) return true;
        }

        path.remove(path.size() - 1);
        return false;
    }
    
    }
    /*static boolean solveRec(State state, List<State> path) {
        if (!state.isValid()) return false;

        if (state.wolf == 0 && state.goat == 0 && state.cabbage == 0) {
            path.add(state);
            return true;
        }

        if (path.contains(state)) return false;

        path.add(state);

        // Move items from left to right bank
        if (state.boat == 0) {
            State newState = new State(state.wolf - 1, state.goat, state.cabbage, 1);
            if (solveRec(newState, path)) return true;

            newState = new State(state.wolf, state.goat - 1, state.cabbage, 1);
            if (solveRec(newState, path)) return true;

            newState = new State(state.wolf, state.goat, state.cabbage - 1, 1);
            if (solveRec(newState, path)) return true;

            newState = new State(state.wolf - 1, state.goat - 1, state.cabbage, 1);
            if (solveRec(newState, path)) return true;

            newState = new State(state.wolf, state.goat - 1, state.cabbage - 1, 1);
            if (solveRec(newState, path)) return true;
        }

        // Move items from right to left bank
        if (state.boat == 1) {
            State newState = new State(state.wolf + 1, state.goat, state.cabbage, 0);
            if (solveRec(newState, path)) return true;

            newState = new State(state.wolf, state.goat + 1, state.cabbage, 0);
            if (solveRec(newState, path)) return true;

            newState = new State(state.wolf, state.goat, state.cabbage + 1, 0);
            if (solveRec(newState, path)) return true;

            newState = new State(state.wolf + 1, state.goat + 1, state.cabbage, 0);
            if (solveRec(newState, path)) return true;

            newState = new State(state.wolf, state.goat + 1, state.cabbage + 1, 0);
            if (solveRec(newState, path)) return true;
        }

        path.remove(path.size() - 1);
        return false;
    }*/

}
