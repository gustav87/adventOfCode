namespace AdventOfCode2023.Day4.Task2;

using System.Text.RegularExpressions;
using AdventOfCode2023;

class Day4Task2
{
    public static void RunDay4Task2()
    {
        List<string> lines = ReadFile1.ReadFile("Day4/day4_input.txt");
        double sum = 0;
        int rowIndex = 0;
        foreach (string line in lines)
        {
            int winningTickets = 0;
            string numbersString = line.Split(":")[1];
            List<string> allNumbers = numbersString.Split("|").ToList();
            string winningNumbersString = allNumbers[0];
            string myNumbersString = allNumbers[1];

            List<int> winningNumbers = GetNumbersFromString(winningNumbersString);
            List<int> myNumbers = GetNumbersFromString(myNumbersString);
            foreach (int winningNumber in winningNumbers)
            {
                winningTickets += myNumbers.Contains(winningNumber) ? 1 : 0;
            }
            foreach (int index in Enumerable.Range(rowIndex + 1, winningTickets + 1))
            {
            
            }
            rowIndex++;
        }
        Console.WriteLine(sum); // 27454
    }

    public static List<int> GetNumbersFromString(string str)
    {
        List<int> numbers = new List<int>();
        Match match = Regex.Match(str, @"\d+");
        while (match.Success)
        {
            numbers.Add(int.Parse(match.Value));
            match = match.NextMatch();
        }
        return numbers;
    }
}
