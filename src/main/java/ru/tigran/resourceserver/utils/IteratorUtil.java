package ru.tigran.resourceserver.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class IteratorUtil {
    private IteratorUtil() {
    }

    public static <T> Stream<T> streamOf(Iterable<T> source){
        return StreamSupport.stream(source.spliterator(), false);
    }

    public static <T> List<T> listOf(Iterable<T> source){
        List<T> result = new ArrayList<>();
        source.forEach(result::add);
        return result;
    }
}
