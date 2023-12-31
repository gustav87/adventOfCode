namespace AdventOfCode2023.Day2.Task1;

using AdventOfCode2023;

class Day2Task1
{
    public static void RunDay2Task1()
    {

        List<string> content = ReadFile1.ReadFile("Day2/day2_input.txt");
        int sum = 0;
        List<int> validTurns = new List<int>();
        foreach (string line in content)
        {
            Game game = new();
            game.ParseLine(line);
            if (game.Valid)
            {
                sum += game.Id;
            }
        }
        Console.WriteLine(sum); // 2285
    }
}
