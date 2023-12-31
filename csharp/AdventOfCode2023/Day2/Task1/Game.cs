using System.Text.RegularExpressions;

namespace AdventOfCode2023.Day2.Task1;

class Game
{
    public int Id { get; set; }
    public readonly int MaxRed = 12;
    public readonly int MaxGreen = 13;
    public readonly int MaxBlue = 14;
    public bool Valid { get; set; } = true;
    public List<Turn> Turns { get; set; } = new List<Turn>();

    public Game()
    {
    }

    public void ParseLine(string line)
    {
        Regex re = new(@"\d+");
        Match m = re.Match(line);
        Id = int.Parse(m.Value);
        List<string> elements = line.Split(':').ToList();
        string allTurns = elements[1];
        List<string> turnsList = allTurns.Split(';').ToList();
        foreach (string t in turnsList)
        {
            Turn turn = new(t);
            Turns.Add(turn);
            if (turn.Red > MaxRed || turn.Green > MaxGreen || turn.Blue > MaxBlue)
            {
                Valid = false;
            }
        }
    }
}

class Turn
{
    public int Red { get; set; }
    public int Green { get; set; }
    public int Blue { get; set; }

    public Turn(string line)
    {
        List<string> colors = line.Split(',').ToList();
        foreach (string color in colors)
        {
            Regex re = new(@"\d+");
            Match m = re.Match(color);
            if (color.Contains("red"))
            {
                Red = int.Parse(m.Value);
            }
            else if (color.Contains("green"))
            {
                Green = int.Parse(m.Value);
            }
            else if (color.Contains("blue"))
            {
                Blue = int.Parse(m.Value);
            }
        }
    }
}
