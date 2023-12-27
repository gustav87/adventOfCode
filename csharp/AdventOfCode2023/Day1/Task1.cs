namespace AdventOfCode2023.Day1;
using AdventOfCode2023;

class Day1Task1
{
    public static void RunDay1Task1()
    {
        List<string> content = ReadFile1.ReadFile("Day1/day1_input.txt");
        int sum = 0;
        foreach (string line in content)
        {
            sum += SumFirstAndLastDigit(line);
        }
        Console.WriteLine(sum); // 54634
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
}
