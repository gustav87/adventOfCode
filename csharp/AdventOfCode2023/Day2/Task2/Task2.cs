namespace AdventOfCode2023.Day2.Task2;

using AdventOfCode2023;

class Day2Task2
{
    public static void RunDay2Task2()
    {
        List<string> content = ReadFile1.ReadFile("Day2/day2_input.txt");
        int sum = 0;
        List<int> validTurns = new List<int>();
        foreach (string line in content)
        {
            Game game = new();
            game.ParseLine(line);
            sum += game.Power;
        }
        Console.WriteLine(sum); // 77021
    }
}
