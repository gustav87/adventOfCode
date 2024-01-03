namespace AdventOfCode2023.Day3.Task2;

using AdventOfCode2023;

class Day3Task2
{
    public static void RunDay3Task2()
    {
        List<string> lines = ReadFile1.ReadFile("Day3/day3_input.txt");
        int sum = 0;
        Engine engine = new(lines);
        foreach ((int, int) gearNumbers in engine.GearNumbers)
        {
            sum += gearNumbers.Item1 * gearNumbers.Item2;
        }
        Console.WriteLine(sum); // 81463996
    }
}
