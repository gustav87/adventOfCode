using System.Text.RegularExpressions;

namespace AdventOfCode2023.Day3.Task1;

class Engine
{
    public List<int> ValidParts { get; set; } = new List<int>();
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

        FindValidParts();
        // ValidParts = ValidParts.Distinct().ToList();
    }

    public void FindValidParts()
    {
        foreach (Line line in Lines)
        {
            Line? previousLine = line.RowIndex == 0 ? null : Lines[line.RowIndex - 1];
            Line? nextLine = line.RowIndex == LastRowIndex ? null : Lines[line.RowIndex + 1];    
            foreach (Part part in line.Parts)
            {
                (int, int) ValidSymbolIndexes = (part.Start - 1, part.End + 1);
                foreach (Symbol symbol in line.Symbols)
                {
                    if (symbol.Position >= ValidSymbolIndexes.Item1 && symbol.Position <= ValidSymbolIndexes.Item2)
                    {
                        ValidParts.Add(part.Id);
                    }
                }
                if (previousLine is not null)
                {
                    foreach (Symbol symbol in previousLine.Symbols)
                    {
                        if (symbol.Position >= ValidSymbolIndexes.Item1 && symbol.Position <= ValidSymbolIndexes.Item2)
                        {
                            ValidParts.Add(part.Id);
                        }
                    }
                }
                if (nextLine is not null)
                {
                    foreach (Symbol symbol in nextLine.Symbols)
                    {
                        if (symbol.Position >= ValidSymbolIndexes.Item1 && symbol.Position <= ValidSymbolIndexes.Item2)
                        {
                            ValidParts.Add(part.Id);
                        }
                    }
                }
            }
        }
    }
}

class Line
{
    public int RowIndex { get; set; }
    public List<Part> Parts { get; set; } = new List<Part>();
    public List<Symbol> Symbols { get; set; } = new List<Symbol>();

    public Line(int rowIndex, string line)
    {
        RowIndex = rowIndex;
        List<Part> parts = GetPartsFromLine(line);
        Parts = parts;

        // foreach (Part part in Parts)
        // {
        //     Console.WriteLine("Part: {0}, StartIndex: {1}, EndIndex: {2}", part.Id, part.Start, part.End);
        // }

        int symbolIndex = 0;
        foreach (char c in line)
        {
            if (IsSymbol(c))
            {
                Symbol symbol = new(c, symbolIndex);
                Symbols.Add(symbol);
            }
            symbolIndex++;
        }

        // foreach (Symbol symbol in Symbols)
        // {
        //     Console.WriteLine("Symbol: {0}, Position: {1}", symbol.Character, symbol.Position);
        // }
    }

    public static List<Part> GetPartsFromLine(string line)
    {
        List<Part> parts = new List<Part>();
        int charsRemoved = 0;
        while (line.Length > 0)
        {
            Match match = Regex.Match(line, @"\d+");
            if (match.Success) {
                int charsToCut = match.Index + match.Value.Length;
                int originalStartIndex = match.Index + charsRemoved;
                int originalEndIndex = match.Index + charsRemoved + match.Value.Length - 1;
                line = line.Substring(charsToCut);
                Part part = new Part(match.Value, originalStartIndex, originalEndIndex);
                charsRemoved += charsToCut;
                parts.Add(part);
            }
            else
            {
                line = "";
            }
        }
        return parts;
    }

    public static (int, int) GetStartAndEndIndex(string number, string line)
    {
        int length = number.Length;

        Match match = Regex.Match(line, @"\D" + number + @"\D");
        int startIndex = match.Index + 1;
        int endIndex = startIndex + length - 1;
        return (startIndex, endIndex);
    }

    public static bool IsSymbol(char c)
    {
        return c != '.' && !char.IsDigit(c);
    }
}

class Part
{
    public int Id { get; set; }
    public int Start { get; set; }
    public int End { get; set; }

    public Part(string number, int start, int end)
    {
        Id = int.Parse(number);
        Start = start;
        End = end;
    }
}

class Symbol
{
    public char Character { get; set; }
    public int Position { get; set; }

    public Symbol(char c, int position)
    {
        Character = c;
        Position = position;
    }
}

    // public Line(int rowIndex, string line)
    // {
    //     RowIndex = rowIndex;
    //     string[] numbers = Regex.Split(line, @"\D+"); // Split on everything that's not a number.
    //     foreach (string number in numbers)
    //     {
    //         if (!string.IsNullOrEmpty(number))
    //         {
    //             (int, int) indexes = GetStartAndEndIndex(number, line);
    //             Part part = new(number, indexes.Item1, indexes.Item2);
    //             Parts.Add(part);
    //         }
    //     }

    //     int symbolIndex = 0;
    //     foreach (char c in line)
    //     {
    //         if (IsSymbol(c))
    //         {
    //             Symbol symbol = new(c, symbolIndex);
    //             Symbols.Add(symbol);
    //         }
    //         symbolIndex++;
    //     }
    // }
