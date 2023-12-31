using SandboxAPI.Encryption;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("OpenCorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors("OpenCorsPolicy");

var sampleTodos = new Todo[] {
    new(1, "Walk the dog"),
    new(2, "Do the dishes", DateOnly.FromDateTime(DateTime.Now)),
    new(3, "Do the laundry", DateOnly.FromDateTime(DateTime.Now.AddDays(1))),
    new(4, "Clean the bathroom"),
    new(5, "Clean the car", DateOnly.FromDateTime(DateTime.Now.AddDays(2)))
};

var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos);
todosApi.MapGet("/{id}", (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is { } todo
        ? Results.Ok(todo)
        : Results.NotFound());

var cryptoApi = app.MapGroup("/crypto");
cryptoApi.MapGet("/rsa", (string publicKeyBase64) => DeliveringKeyManager.GetEncryptedKey_Hardcoded(publicKeyBase64));
cryptoApi.MapPost("/rsa-xml", (Request payload) => DeliveringKeyManager.GetEncryptedKey_XML(payload));
cryptoApi.MapPost("/rsa-binary", (Request payload) => DeliveringKeyManager.GetEncryptedKey_Binary(payload));

app.Run();

public record Todo(int Id, string? Title, DateOnly? DueBy = null, bool IsComplete = false);

[JsonSerializable(typeof(Todo[]))]
[JsonSerializable(typeof(DeliveringKeyModel))]
[JsonSerializable(typeof(Request))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}
