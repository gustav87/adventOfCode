using System.Text.RegularExpressions;

namespace AdventOfCode2023.Day3.Task2;

class Engine
{
    public List<(int, int)> GearNumbers { get; set; } = new List<(int, int)>();
    public List<Line> Lines { get; set; } = new List<Line>();
    public int LastRowIndex { get; set; } = 0;

    public Engine(List<string> lines)
    {
        int rowIndex = 0;
        foreach (string l in lines)
        {
            Line line = new(rowIndex, l);
            Lines.Add(line);
            LastRowIndex = rowIndex++;
        }

        FindGearNumbers();
    }

    public void FindGearNumbers()
    {
        foreach (Line line in Lines)
        {
            Line? previousLine = line.RowIndex == 0 ? null : Lines[line.RowIndex - 1];
            Line? nextLine = line.RowIndex == LastRowIndex ? null : Lines[line.RowIndex + 1];    
            foreach (Gear gear in line.Gears)
            {
                int part1 = 0;
                int part2 = 0;
                List<int> GearIndexes = new List<int> {gear.Position - 1, gear.Position, gear.Position + 1};
                foreach (Part part in line.Parts)
                {
                    foreach (int index in part.Indexes)
                    {
                        if (index == GearIndexes[0] || index == GearIndexes[1] || index == GearIndexes[2])
                        {
                            if (part1 == 0)
                            {
                                part1 = part.Value;
                                break;
                            }
                            else
                            {
                                part2 = part.Value;
                                break;
                            }
                        }
                    }
                }
                if (previousLine is not null)
                {
                    foreach (Part part in previousLine.Parts)
                    {
                        foreach (int index in part.Indexes)
                        {
                            if (index == GearIndexes[0] || index == GearIndexes[1] || index == GearIndexes[2])
                            {
                                if (part1 == 0)
                                {
                                    part1 = part.Value;
                                    break;
                                }
                                else
                                {
                                    part2 = part.Value;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (nextLine is not null)
                {
                    foreach (Part part in nextLine.Parts)
                    {
                        foreach (int index in part.Indexes)
                        {
                            if (index == GearIndexes[0] || index == GearIndexes[1] || index == GearIndexes[2])
                            {
                                if (part1 == 0)
                                {
                                    part1 = part.Value;
                                    break;
                                }
                                else
                                {
                                    part2 = part.Value;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (part1 != 0 && part2 != 0)
                {
                    GearNumbers.Add((part1, part2));
                }
            }
        }
    }
}

class Line
{
    public int RowIndex { get; set; }
    public List<Part> Parts { get; set; } = new List<Part>();
    public List<Gear> Gears { get; set; } = new List<Gear>();

    public Line(int rowIndex, string line)
    {
        RowIndex = rowIndex;
        GetPartsFromLine(line);

        int gearIndex = 0;
        foreach (char c in line)
        {
            if (IsGear(c))
            {
                Gear gear = new(c, gearIndex);
                Gears.Add(gear);
            }
            gearIndex++;
        }
    }

    public void GetPartsFromLine(string line)
    {
        Match match = Regex.Match(line, @"\d+");
        int partId = 0;
        while (match.Success)
        {
            int endIndex = match.Index + match.Value.Length - 1;
            Part part = new Part((RowIndex, partId), match.Value, match.Index, endIndex);
            partId++;

            Parts.Add(part);
            match = match.NextMatch();
        }
    }

    public static bool IsGear(char c)
    {
        return c == '*';
    }
}

class Part
{
    public (int, int) Id { get; set; }
    public int Value { get; set; }
    public List<int> Indexes { get; set; } = new List<int>();

    public Part((int, int) id, string value, int start, int end)
    {
        Id = id;
        Value = int.Parse(value);
        SetIndexes(start, end);
    }

    public void SetIndexes(int start, int end)
    {
        int diff = end - start + 1;
        foreach (int index in Enumerable.Range(start, diff))
        {
            Indexes.Add(index);
        }
    }
}

class Gear
{
    public char Character { get; set; }
    public int Position { get; set; }

    public Gear(char c, int position)
    {
        Character = c;
        Position = position;
    }
}
