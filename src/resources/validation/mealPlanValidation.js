
export const validateMealPlanInput = (values) => {
    const errors = {}

    if (!values.gender){
        errors.gender = "Gender is required";
    }

    if (!values.age){
        errors.age = "Age is required";
    } else if(values.age < 16 || values.age > 150){
        errors.age = "Age must be between 16 and 150"
    }

    if (!values.height){
        errors.height = "Height is required";
    } else if(values.height < 100 || values.height > 400){
        errors.height = "Height must be between 100 and 400";
    }

    if (!values.weight){
        errors.weight = "Weight is required";
    } else if(values.weight < 20 || values.weight > 300){
        errors.weight = "Weight must be between 20 and 300";
    }

    if (!values.numberOfMeals){
        errors.numberOfMeals = "Number of Meals is required";
    }

    if (!values.activityType){
        errors.activityType = "Activity type is required";
    }

    if (!values.goal){
        errors.goal = "Goal is required";
    }

    if (!values.goalTier){
        errors.goalTier = "Goal tier is required";
    }
    return errors;
}