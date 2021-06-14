using System;
using System.Collections.Generic;

public static class ForEachExtension
{
    public static void ForEach<T>(this IEnumerable<T> seq, Action<T> action)
    {
        foreach (var item in seq)
            action(item);
    }

    // Here's a lazy, streaming version:
    public static IEnumerable<T> ForEachLazy<T>(this IEnumerable<T> seq, Action<T> action)
    {
        foreach (var item in seq)
        {
            action(item);
            yield return item;
        }
    }
}