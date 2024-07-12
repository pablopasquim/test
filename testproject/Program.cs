var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();

app.MapMethods("/api/tarefa/alterar", new[] { "PATCH" }, async (AppDbContext db, int id) =>
{
    var tarefa = await db.Tarefas.FindAsync(id);
    if (tarefa == null)
    {
        return Results.NotFound();
    }

    if (tarefa.Status == "Não iniciada")
    {
        tarefa.Status = "Em andamento";
    }
    else if (tarefa.Status == "Em andamento")
    {
        tarefa.Status = "Concluída";
    }

    await db.SaveChangesAsync();
    return Results.Ok(tarefa);
});


app.MapGet("/api/tarefa/naoconcluidas", async (AppDbContext db) =>
{
    var tarefas = await db.Tarefas
                          .Where(t => t.Status == "Não iniciada" || t.Status == "Em andamento")
                          .ToListAsync();
    return Results.Ok(tarefas);
});

app.MapGet("/api/tarefa/concluidas", async (AppDbContext db) =>
{
    var tarefas = await db.Tarefas
                          .Where(t => t.Status == "Concluída")
                          .ToListAsync();
    return Results.Ok(tarefas);
});
