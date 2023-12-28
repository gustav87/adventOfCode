namespace AdventOfCode2023.Day1;

using System.Text.RegularExpressions;
using AdventOfCode2023;

class Day1Task2
{
    public static void RunDay1Task2()
    {
        List<string> content = ReadFile1.ReadFile("Day1/day1_input.txt");
        int sum = 0;
        foreach (string line in content)
        {
            int d1 = GetDigitFromLine(line, false);
            int d2 = GetDigitFromLine(line, true);
            sum += SumDigits(d1, d2);
        }
        Console.WriteLine(sum); // 53855
    }

    static int GetDigitFromLine(string line, bool last)
    {
        Regex re = new(@"\d|zero|one|two|three|four|five|six|seven|eight|nine", last ? RegexOptions.RightToLeft : RegexOptions.None);
        Match m = re.Match(line);
        string result;
        if (m.Success)
        {
            result = string.Format("RegEx found " + m.Value + " at position " + m.Index.ToString());
        }
        else
        {
            throw new Exception("You didn't enter a string containing a number!");
        }
        Console.WriteLine(result);
        int digit = ParseStringToDigit(m.Value);

        return digit;
    }

    static int ParseStringToDigit(string str)
    {
        if (str.All(char.IsDigit))
        {
            return int.Parse(str);
        }
        else
        {
            var digitStrings = Enum.GetValues(typeof(Digits));
            foreach (Digits d in digitStrings)
            {
                if (d.ToString() == str)
                {
                    return (int) d;
                }
            }
        }
        return 0;
    }

    static int SumDigits(int d1, int d2)
    {
        int.TryParse($"{d1}{d2}", out int bothDigits);
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

    static int GetFirstDigitIndex(string line)
    {
        int indexOfFirstInt = line.IndexOfAny("0123456789".ToCharArray());
        Console.WriteLine(indexOfFirstInt);
        return indexOfFirstInt;
    }
}
