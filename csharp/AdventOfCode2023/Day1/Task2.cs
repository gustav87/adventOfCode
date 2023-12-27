namespace AdventOfCode2023.Day1;
using AdventOfCode2023;

class Day1Task2
{
    public static void RunDay1Task2()
    {
        List<string> content = ReadFile1.ReadFile("Day1/day1_input.txt");
        int sum = 0;
        foreach (string line in content)
        {
            sum += SumFirstAndLastDigit(line);
            GetFirstDigit(line);
        }
    }

    static int GetFirstDigit(string line)
    {
        line = "0abc123";
        int indexOfFirstInt = line.IndexOfAny("0123456789".ToCharArray());
        Console.WriteLine(indexOfFirstInt);
        // line.IndexOf('.');
        return 1;
    }
    static int SumFirstAndLastDigit(string line)
    {
        char firstDigit = '0';
        char lastDigit = '0';
        bool isFirstDigitSet = false;

        foreach (char c in line)
        {
            if (char.IsNumber(c))
            {
                if (isFirstDigitSet)
                {
                    lastDigit = c;
                }
                else
                {
                    firstDigit = c;
                    isFirstDigitSet = true;
                }
            }
        }
        if (lastDigit == '0')
        {
            lastDigit = firstDigit;
        }
        int.TryParse($"{firstDigit}{lastDigit}", out int bothDigits);
        return bothDigits;
    }

    enum Digits
    {
        zero = 0,
        one = 1,
        two = 2,
        three = 3,
        four = 4,
        five = 5,
        six = 6,
        seven = 7,
        eight = 8,
        nine = 9,
    }
}
