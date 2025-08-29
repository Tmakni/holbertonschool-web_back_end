export default function(mathFunction) {
    const queue = [];

    try{
    const results = mathFunction();
    queue.push(results);

}   catch (error) {
    queue.push(`Error: ${error.message}`);
}
    queue.push('Guardrail was processed');
    return queue;
}
