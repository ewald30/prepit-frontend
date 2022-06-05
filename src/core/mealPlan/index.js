export const MealPlanComponentState = {
    height : null,
    weight : null,
    gender: '',
    age : null,
    numberOfMeals: null,
    activityType: null,
    goal: '',
    goalTier: 0,
    loading:false,
    error: null,
    id: 0,
    saveUser: null,
    overwrittenValues: false,
    modalOpen: false,
}

export const MealPlanPageState = {
    meals: [],
    selectedMeal : "",
    selectedRecipe : null,
    modalOpen: false,
    collectionModalOpen: false,
    collectionCreationModalOpen: false,
    selectedCollection: null,
    collections: [],
    loadingSaveMeal: false
}