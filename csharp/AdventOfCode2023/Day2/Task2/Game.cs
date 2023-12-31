using System.Text.RegularExpressions;

namespace AdventOfCode2023.Day2.Task2;

class Game
{
    public int Id { get; set; }
    public int MinRed = 0;
    public int MinGreen = 0;
    public int MinBlue = 0;
    public int Power { get; set; }
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
            if (turn.Red > MinRed)
            {
                MinRed = turn.Red;
            }
            if (turn.Green > MinGreen)
            {
                MinGreen = turn.Green;
            }
            if (turn.Blue > MinBlue)
            {
                MinBlue = turn.Blue;
            }
        }
        Power = MinRed * MinGreen * MinBlue;
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
