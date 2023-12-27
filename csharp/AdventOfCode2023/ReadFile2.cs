namespace AdventOfCode2023;
class ReadFile2
{
    public static List<string> ReadFile(string path)
    {
        // string path = @"day1_input.txt";

        // This text is added only once to the file.
        if (!File.Exists(path))
        {
            Console.WriteLine("File not found!");
            throw new FileNotFoundException();
        }

        // Open the file to read from.
        string content = File.ReadAllText(path);
        List<string> contentList = content.Split('\n').ToList();
        return contentList;
    }
}
