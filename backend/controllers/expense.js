
import moment from "moment";

import User from "../models/auth.js";
import Expense from "../models/expense.js";




export const addExpense= async(req,res)=>{
  
    const {description ,category,amount}=req.body;
    const {id}=req.params;
    try {
          
        const result=await Expense.create({description,category,amount, user: id});
        res.status(201).json(result);
        
    } catch (error) {
          console.log(error);
          res.status(500).json(error);
    }
}


export const getExpense = async (req, res) => {
  const { page, perPage } = req.query;
  const { id } = req.params;

  // Ensure that page and perPage are valid integers
  const parsedPage = parseInt(page, 10);
  const parsedPerPage = parseInt(perPage, 10);

  // Check if parsedPage or parsedPerPage are NaN (invalid)
  if (isNaN(parsedPage) || isNaN(parsedPerPage)) {
    return res.status(400).json({ message: 'Invalid page or perPage value' });
  }

  try {
    const startIndex = (parsedPage - 1) * parsedPerPage;

    // Fetch the paginated data and total count using Mongoose
    const expenses = await Expense.find({ user: id })
      .skip(startIndex)
      .limit(parsedPerPage)
      .exec();

    const totalCount = await Expense.countDocuments({ user: id });

    // Send the paginated data as well as the total count of items in the response

    res.json({ expenses, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




export const editExpense = async (req, res) => {
  const { description, amount, category } = req.body;
  const { id } = req.params;

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id }, // Find the expense by its ObjectId
      { description, amount, category },
      { new: true } // Set `new` to true to return the updated document
    );

    if (updatedExpense) {
      res.status(200).json("Edit successful.");
    } else {
      res.status(404).json("Expense not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findOneAndDelete({ _id: id });

    if (deletedExpense) {
      res.status(200).json("Expense deleted successfully.");
    } else {
      res.status(404).json("Expense not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




export const getReportByDay = async (req, res) => {
  const { date } = req.query; // Get the date from the query parameters
  const { id } = req.params; // Get the user ID from the URL parameters

  console.log(date)
  try {
    // Parse the date using the 'moment' library with the specified format (e.g., 'DD-MM-YYYY')
    const parsedDate = moment(date, 'DD-MM-YYYY');

    // Find expenses for the given user and within the specified date range
    const data = await Expense.find({
      user: id,
      createdAt: {
        $gte: parsedDate.startOf('day').toDate(), // Start of the specified day
        $lte: parsedDate.endOf('day').toDate(), // End of the specified day
      },
    });

    // Return the fetched data as a JSON response

    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const getReportByMonth = async (req, res) => {
  const { date } = req.query;
  const { id } = req.params;

  // Specify the correct format for the date string, including time
  const format = 'DD-MM-YYYY';
  console.log("month data......");

  // Parse the date string with the specified format
  const parsedDate = moment(date, format);

  try {
    // Extract the year and month from the parsed date
    const year = parsedDate.year();
    const month = parsedDate.month() + 1; // Months in JavaScript are 0-based, so add 1

    // Use Mongoose to query expenses for the specified month and year
    const data = await Expense.find({
      user: id,
      createdAt: {
        $gte: parsedDate.startOf('month').toDate(),
        $lte: parsedDate.endOf('month').toDate(),
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserAllExpenses = async (req, res) => {
  console.log("leaderboard");
  
  try {
    const usersWithExpenses = await User.aggregate([
      {
        $lookup: {
          from: 'expenses', // Collection name for expenses
          localField: '_id',
          foreignField: 'user',
          as: 'expenses',
        },
      },
      {
        $project: {
          name: 1,
          expenses: {
            category: 1,
            description: 1,
            amount: 1,
          },
        },
      },
    ]);

    const formattedData = usersWithExpenses.map((user) => {
      // Calculate total expenses for the user
      const totalExpenses = user.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );

      return {
        id: user._id,
        name: user.name,
        totalExpenses,
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};




