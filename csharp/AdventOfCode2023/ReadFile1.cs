namespace AdventOfCode2023;
class ReadFile1
{
    public static List<string> ReadFile(string path)
    {
        List<string> content = new();
        FileStream fileStream = new(path, FileMode.Open);
        using StreamReader reader = new(fileStream);
        while (!reader.EndOfStream)
        {
            // string? line = reader.ReadLine();
            // Console.WriteLine(line);
            content.Add(reader.ReadLine() ?? "");
        }
        return content;
    }
}
