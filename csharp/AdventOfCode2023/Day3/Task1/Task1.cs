namespace AdventOfCode2023.Day3.Task1;

using AdventOfCode2023;

class Day3Task1
{
    public static void RunDay3Task1()
    {
        List<string> lines = ReadFile1.ReadFile("Day3/day3_input.txt");
        int sum = 0;
        Engine engine = new(lines);
        foreach (int partNumber in engine.ValidParts)
        {
            sum += partNumber;
        }
        Console.WriteLine(sum); // 527144
    }
}
